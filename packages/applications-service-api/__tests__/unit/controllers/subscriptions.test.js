jest.mock('../../../src/services/application.v2.service');
jest.mock('../../../src/lib/notify');
jest.mock('../../../src/lib/crypto');

const { getApplication } = require('../../../src/services/application.v2.service');
const { sendSubscriptionCreateNotification } = require('../../../src/lib/notify');
const { encrypt } = require('../../../src/lib/crypto');
const { createSubscription } = require('../../../src/controllers/subscriptions');
const ApiError = require('../../../src/error/apiError');

describe('subscriptions controller', () => {
	const mockTime = new Date('2023-07-06T11:06:00.000Z');
	const mockRes = { send: jest.fn() };

	const req = {
		params: {
			caseReference: 'BC0110001'
		},
		body: {
			email: 'user@example.org',
			subscriptionTypes: ['applicationSubmitted', 'applicationDecided']
		}
	};

	beforeEach(() => jest.resetAllMocks());

	describe('createSubscription', () => {
		it('invokes notify with correct project and subscription details', async () => {
			jest.useFakeTimers().setSystemTime(mockTime);
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
});
