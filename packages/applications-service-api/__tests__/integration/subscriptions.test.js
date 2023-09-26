const { notifyBuilder } = require('@planning-inspectorate/pins-notify');
const { decrypt, encrypt } = require('../../src/lib/crypto');
const { request } = require('../__data__/supertest');
const { APPLICATION_DB, APPLICATION_FO } = require('../__data__/application');

const mockFindUnique = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));

const mockProjectFindOne = jest.fn();
jest.mock('../../src/models', () => {
	return {
		Project: {
			findOne: (attributes) => mockProjectFindOne(attributes)
		}
	};
});

const dateSpy = jest.spyOn(Date, 'now');

const config = require('../../src/lib/config');

jest.mock('@planning-inspectorate/pins-notify', () => ({
	createNotifyClient: {
		createNotifyClient: jest.fn().mockReturnThis()
	},
	notifyBuilder: {
		reset: jest.fn().mockReturnThis(),
		setNotifyClient: jest.fn().mockReturnThis(),
		setTemplateId: jest.fn().mockReturnThis(),
		setDestinationEmailAddress: jest.fn().mockReturnThis(),
		setTemplateVariablesFromObject: jest.fn().mockReturnThis(),
		setReference: jest.fn().mockReturnThis(),
		sendEmail: jest.fn()
	}
}));

describe('/api/v1/subscriptions/:caseReference', () => {
	const mockTime = new Date('2023-07-06T11:06:00.000Z');

	beforeEach(() => {
		config.backOfficeIntegration.applications.getApplication.caseReferences = ['EN010116'];
	});
	afterEach(() => {
		mockFindUnique.mockReset();
		mockProjectFindOne.mockReset();
		dateSpy.mockReset();
	});

	describe('POST', () => {
		it('given Back Office case with caseReference exists, returns 200', async () => {
			dateSpy.mockImplementation(() => mockTime.getTime());
			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.post('/api/v1/subscriptions/EN010116').send({
				email: 'test@example.org',
				subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
			});

			expect(response.status).toEqual(200);
			expect(decrypt(response.body.subscriptionDetails)).toEqual(
				JSON.stringify({
					email: 'test@example.org',
					subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
					date: mockTime
				})
			);
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('test@example.org');
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				subscription_url: `http://forms-web-app:9004/projects/EN010116/get-updates/subscribed?subscriptionDetails=${response.body.subscriptionDetails}`,
				project_name: 'North Lincolnshire Green Energy Park',
				project_email: 'webteam@planninginspectorate.gov.uk'
			});
		});

		it('given NI case with caseReference exists, returns 200', async () => {
			config.backOfficeIntegration.applications.getApplication.caseReferences = [];
			dateSpy.mockImplementation(() => mockTime.getTime());
			mockProjectFindOne.mockResolvedValueOnce({ dataValues: APPLICATION_FO });

			const response = await request.post('/api/v1/subscriptions/EN010116').send({
				email: 'test@example.org',
				subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
			});

			expect(response.status).toEqual(200);
			expect(decrypt(response.body.subscriptionDetails)).toEqual(
				JSON.stringify({
					email: 'test@example.org',
					subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
					date: mockTime
				})
			);
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('test@example.org');
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				subscription_url: `http://forms-web-app:9004/projects/EN010116/get-updates/subscribed?subscriptionDetails=${response.body.subscriptionDetails}`,
				project_name: 'North Lincolnshire Green Energy Park',
				project_email: 'webteam@planninginspectorate.gov.uk'
			});
		});

		it('returns 400 if required fields are missing from request body', async () => {
			const response = await request.post('/api/v1/subscriptions/EN010116').send({});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: 400,
				errors: [
					"must have required property 'email'",
					"must have required property 'subscriptionTypes'"
				]
			});
		});

		it('returns 400 if subscriptionType is not one of the allowed values', async () => {
			const response = await request.post('/api/v1/subscriptions/EN010116').send({
				email: 'test@example.org',
				subscriptionTypes: ['bad value']
			});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: 400,
				errors: ["'subscriptionTypes.0' must be equal to one of the allowed values"]
			});
		});

		it('returns 404 if project is not found', async () => {
			mockFindUnique.mockResolvedValueOnce(null);

			const response = await request.post('/api/v1/subscriptions/XX0000000').send({
				email: 'test@example.org',
				subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
			});

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: 404,
				errors: ['Project with case reference XX0000000 not found']
			});
		});
	});

	describe('PUT', () => {
		const validPayload = encrypt(
			JSON.stringify({
				email: 'test@example.org',
				subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
				date: new Date()
			})
		);

		it('given valid payload and caseReference that exists, returns 204', async () => {
			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.put('/api/v1/subscriptions/EN010116').send({
				subscriptionDetails: validPayload
			});

			expect(response.status).toEqual(204);
		});

		it('given expired payload, returns 400', async () => {
			const expiredPayload = encrypt(
				JSON.stringify({
					email: 'test@example.org',
					subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
					date: new Date('2023-07-09T13:35:00.000Z')
				})
			);

			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.put('/api/v1/subscriptions/EN010116').send({
				subscriptionDetails: expiredPayload
			});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: 400,
				errors: ['Subscription details have expired']
			});
		});

		it('given missing payload, returns 400', async () => {
			const response = await request.put('/api/v1/subscriptions/EN010116').send({});

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: 400,
				errors: ["must have required property 'subscriptionDetails'"]
			});
		});

		it('returns 404 if project is not found', async () => {
			mockFindUnique.mockResolvedValueOnce(null);

			const response = await request.put('/api/v1/subscriptions/XX0000000').send({
				subscriptionDetails: 'xxxxxxxxxxxxxxxxx'
			});

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: 404,
				errors: ['Project with case reference XX0000000 not found']
			});
		});

		it('given payload with missing email, returns 500', async () => {
			const missingEmailPayload = encrypt(
				JSON.stringify({
					subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
					date: new Date()
				})
			);

			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.put('/api/v1/subscriptions/EN010116').send({
				subscriptionDetails: missingEmailPayload
			});

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				code: 500,
				errors: ['encrypted subscriptionDetails must contain `email` property']
			});
		});

		it('given payload with missing subscriptionTypes, returns 500', async () => {
			const missingSubscriptionTypesPayload = encrypt(
				JSON.stringify({
					email: 'test@example.org',
					date: new Date()
				})
			);

			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.put('/api/v1/subscriptions/EN010116').send({
				subscriptionDetails: missingSubscriptionTypesPayload
			});

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				code: 500,
				errors: ['encrypted subscriptionDetails must contain `subscriptionTypes` property']
			});
		});

		it('given invalid payload that cannot be decrypted, returns 500', async () => {
			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.put('/api/v1/subscriptions/EN010116').send({
				subscriptionDetails: 'BAD_PAYLOAD'
			});

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				code: 500,
				errors: ['Failed to decrypt subscriptionDetails']
			});
		});
	});

	describe('DELETE', () => {
		const encryptedEmail = encrypt('test@example.org');

		it('given valid encrypted email and caseReference that exists, returns 200', async () => {
			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request
				.delete('/api/v1/subscriptions/EN010116')
				.query({ email: encryptedEmail })
				.send();

			expect(response.status).toEqual(204);
		});

		it('given missing email, returns 400', async () => {
			const response = await request.delete('/api/v1/subscriptions/EN010116').send();

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: 400,
				errors: ["must have required property 'email'"]
			});
		});

		it('returns 404 if project is not found', async () => {
			mockFindUnique.mockResolvedValueOnce(null);

			const response = await request
				.delete('/api/v1/subscriptions/XX0000000')
				.query({ email: encryptedEmail })
				.send();

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: 404,
				errors: ['Project with case reference XX0000000 not found']
			});
		});

		it('given invalid encrypted email, returns 500', async () => {
			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request
				.delete('/api/v1/subscriptions/EN010116')
				.query({
					email: 'bad_encrypted_email'
				})
				.send();

			expect(response.status).toEqual(500);
		});
	});
});
