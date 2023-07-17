jest.mock('../../../src/lib/eventClient');

const { sendMessages } = require('../../../src/lib/eventClient');
const {
	publishCreateNSIPSubscription,
	publishDeleteNSIPSubscription
} = require('../../../src/services/backoffice.publish.service');

describe('back office publish service', () => {
	afterEach(() => jest.resetAllMocks());

	describe('publishCreateNSIPSubscription', () => {
		const mockTime = new Date('2023-07-06T11:06:00.000Z');

		it('invokes event client with correct message', async () => {
			jest.spyOn(Date, 'now').mockImplementation(() => mockTime.getTime());

			await publishCreateNSIPSubscription('BC0110001', 'foo@example.org', [
				'applicationDecided',
				'registrationOpen'
			]);

			expect(sendMessages).toBeCalledWith('register-nsip-subscription', [
				{
					body: {
						nsipSubscription: {
							caseReference: 'BC0110001',
							emailAddress: 'foo@example.org',
							startDate: mockTime
						},
						subscriptionTypes: ['applicationDecided', 'registrationOpen']
					},
					contentType: 'application/json',
					applicationProperties: {
						version: '0.1',
						type: 'Create'
					}
				}
			]);
		});
	});

	describe('publishDeleteNSIPSubscription', () => {
		it('invokes event client with correct message', async () => {
			await publishDeleteNSIPSubscription('BC0110001', 'foo@example.org');

			expect(sendMessages).toBeCalledWith('register-nsip-subscription', [
				{
					body: {
						nsipSubscription: {
							caseReference: 'BC0110001',
							emailAddress: 'foo@example.org',
						}
					},
					contentType: 'application/json',
					applicationProperties: {
						version: '0.1',
						type: 'Delete'
					}
				}
			]);
		});
	});
});
