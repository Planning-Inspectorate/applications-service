const { notifyBuilder } = require('@planning-inspectorate/pins-notify');
const { decrypt } = require('../../src/lib/crypto');
const { request } = require('../__data__/supertest');

const mockFindUnique = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));

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

	beforeEach(() => jest.spyOn(Date, 'now').mockImplementation(() => mockTime.getTime()));
	afterEach(() => jest.resetAllMocks());

	it('given case with caseReference exists, returns 200', async () => {
		mockFindUnique.mockResolvedValueOnce({
			projectName: 'drax',
			projectEmailAddress: 'drax@example.org',
			caseReference: 'BC0110001'
		});

		const response = await request.post('/api/v1/subscriptions/BC0110001').send({
			email: 'test@example.org',
			subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
		});

		const decryptedSubscriptionDetails = decrypt(response.body.subscriptionDetails);

		expect(response.status).toEqual(200);
		expect(decryptedSubscriptionDetails).toEqual(
			JSON.stringify({
				email: 'test@example.org',
				subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
				date: mockTime
			})
		);
		expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('test@example.org');
		expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
			subscription_url: `http://forms-web-app:9004/projects/BC0110001/get-updates/subscribed?subscriptionDetails=${response.body.subscriptionDetails}`,
			project_name: 'drax',
			project_email: 'drax@example.org'
		});
	});

	it('returns 400 if required fields are missing from request body', async () => {
		const response = await request.post('/api/v1/subscriptions/BC0110001').send({});

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
		const response = await request.post('/api/v1/subscriptions/BC0110001').send({
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

		const response = await request.post('/api/v1/subscriptions/AA0000000').send({
			email: 'test@example.org',
			subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
		});

		expect(response.status).toEqual(404);
		expect(response.body).toEqual({
			code: 404,
			errors: ['Project with case reference AA0000000 not found']
		});
	});

	it('returns 500 if notify throws error', async () => {
		mockFindUnique.mockResolvedValueOnce({
			projectName: 'drax',
			projectEmailAddress: 'drax@example.org',
			caseReference: 'BC0110001'
		});
		notifyBuilder.sendEmail.mockRejectedValueOnce(new Error('some notify error'));

		const response = await request.post('/api/v1/subscriptions/BC0110001').send({
			email: 'test@example.org',
			subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
		});

		expect(response.status).toEqual(500);
		expect(response.body).toEqual({
			code: 500,
			message: { errors: ['Unexpected internal server error while handling API call'] }
		});
	});
});
