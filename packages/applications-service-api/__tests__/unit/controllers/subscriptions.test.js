jest.mock('../../../src/services/application.v2.service');
jest.mock('../../../src/lib/notify');
jest.mock('../../../src/lib/crypto');
jest.mock('../../../src/services/backoffice.publish.service');

const { getApplication } = require('../../../src/services/application.v2.service');
const { sendSubscriptionCreateNotification } = require('../../../src/lib/notify');
const { encrypt, decrypt } = require('../../../src/lib/crypto');
const {
	createSubscription,
	confirmSubscription,
	deleteSubscription
} = require('../../../src/controllers/subscriptions');
const ApiError = require('../../../src/error/apiError');
const { when } = require('jest-when');
const {
	publishCreateNSIPSubscription,
	publishDeleteNSIPSubscription
} = require('../../../src/services/backoffice.publish.service');

describe('subscriptions controller', () => {
	const mockTime = new Date('2023-07-06T11:06:00.000Z');
	let mockRes;

	beforeEach(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => mockTime.getTime());
		mockRes = { send: jest.fn() };
	});
	afterEach(() => jest.resetAllMocks());

	describe('createSubscription', () => {
		const req = {
			params: {
				caseReference: 'BC0110001'
			},
			body: {
				email: 'user@example.org',
				subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
			}
		};

		it('invokes notify with correct project and subscription details', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseReference: 'BC0110001'
			});
			encrypt.mockReturnValueOnce('some_encrypted_string');

			await createSubscription(req, mockRes);

			expect(encrypt).toBeCalledWith(
				'{"email":"user@example.org","subscriptionTypes":["applicationSubmitted","applicationDecided"],"date":"2023-07-06T11:06:00.000Z"}'
			);
			expect(sendSubscriptionCreateNotification).toBeCalledWith({
				email: 'user@example.org',
				subscriptionDetails: 'some_encrypted_string',
				project: {
					email: 'drax@example.org',
					name: 'drax',
					caseReference: 'BC0110001'
				}
			});
			expect(mockRes.send).toBeCalledWith({
				subscriptionDetails: 'some_encrypted_string'
			});
		});

		it('throws not found error if project with case reference does not exist', async () => {
			getApplication.mockResolvedValueOnce(null);

			const expectedError = new ApiError(404, {
				errors: ['Project with case reference BC0110001 not found']
			});

			await expect(() => createSubscription(req, mockRes)).rejects.toEqual(expectedError);
		});

		it('throws error if notify fails', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseRef: 'BC0110001'
			});
			encrypt.mockReturnValueOnce('some_encrypted_string');

			const expectedError = new Error('some error');
			sendSubscriptionCreateNotification.mockRejectedValueOnce(expectedError);

			await expect(() => createSubscription(req, mockRes)).rejects.toEqual(expectedError);
		});
	});

	describe('completeSubscription', () => {
		const req = {
			params: {
				caseReference: 'BC0110001'
			},
			body: {
				subscriptionDetails: 'some_encrypted_string'
			}
		};

		it('given valid subscriptionDetails, invokes publishCreateNSIPSubscription, and returns 200', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseRef: 'BC0110001'
			});
			when(decrypt)
				.calledWith('some_encrypted_string')
				.mockReturnValue(
					JSON.stringify({
						email: 'user@example.org',
						subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
						date: mockTime
					})
				);

			await confirmSubscription(req, mockRes);

			expect(publishCreateNSIPSubscription).toBeCalledWith('BC0110001', 'user@example.org', [
				'applicationSubmitted',
				'applicationDecided'
			]);
			expect(mockRes.send).toBeCalled();
		});

		it('throws not found error if project with case reference does not exist', async () => {
			getApplication.mockResolvedValueOnce(null);

			const expectedError = new ApiError(404, {
				errors: ['Project with case reference BC0110001 not found']
			});

			await expect(() => confirmSubscription(req, mockRes)).rejects.toEqual(expectedError);
		});

		it('throws bad request error if subscriptionDetails have expired', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseRef: 'BC0110001'
			});
			when(decrypt)
				.calledWith('some_encrypted_string')
				.mockReturnValue(
					JSON.stringify({
						email: 'user@example.org',
						subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
						date: new Date('2023-01-01 12:00:00')
					})
				);

			const expectedError = new ApiError(400, {
				errors: ['Subscription details have expired']
			});

			await expect(() => confirmSubscription(req, mockRes)).rejects.toEqual(expectedError);
		});

		it('throws error if publishCreateNSIPSubscription fails', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseRef: 'BC0110001'
			});
			when(decrypt)
				.calledWith('some_encrypted_string')
				.mockReturnValue(
					JSON.stringify({
						email: 'user@example.org',
						subscriptionTypes: ['applicationSubmitted', 'applicationDecided'],
						date: mockTime
					})
				);
			publishCreateNSIPSubscription.mockRejectedValueOnce(new Error('some publishing error'));

			await expect(() => confirmSubscription(req, mockRes)).rejects.toThrow(
				'some publishing error'
			);
		});
	});

	describe('deleteSubscription', () => {
		const req = {
			params: {
				caseReference: 'BC0110001',
			},
			query: {
				email: 'some_encrypted_string'
			}
		};

		it('given valid encrypted email, invokes publishDeleteNSIPSubscription, and returns 200', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseRef: 'BC0110001'
			});
			when(decrypt)
				.calledWith('some_encrypted_string')
				.mockReturnValue('user@example.org');

			await deleteSubscription(req, mockRes);

			expect(publishDeleteNSIPSubscription).toBeCalledWith('BC0110001', 'user@example.org');
			expect(mockRes.send).toBeCalled();
		});

		it('throws not found error if project with case reference does not exist', async () => {
			getApplication.mockResolvedValueOnce(null);

			const expectedError = new ApiError(404, {
				errors: ['Project with case reference BC0110001 not found']
			});

			await expect(() => deleteSubscription(req, mockRes)).rejects.toEqual(expectedError);
		});

		it('throws error if publishDeleteNSIPSubscription fails', async () => {
			getApplication.mockResolvedValueOnce({
				projectName: 'drax',
				projectEmailAddress: 'drax@example.org',
				caseRef: 'BC0110001'
			});
			when(decrypt).calledWith('some_encrypted_string').mockReturnValue('user@example.org');

			publishDeleteNSIPSubscription.mockRejectedValueOnce(new Error('some publishing error'));

			await expect(() => deleteSubscription(req, mockRes)).rejects.toThrow('some publishing error');
		});
	});
});
