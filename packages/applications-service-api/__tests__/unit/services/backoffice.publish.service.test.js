jest.mock('../../../src/lib/eventClient');

const { sendMessages } = require('../../../src/lib/eventClient');
const { publishNSIPSubscription } = require('../../../src/services/backoffice.publish.service');

describe('back office publish service', () => {
	describe('publishNSIPSubscription', () => {
		const mockTime = new Date('2023-07-06T11:06:00.000Z');

		afterEach(() => jest.resetAllMocks());

		it('invokes event client with correct message', async () => {
			jest.spyOn(Date, 'now').mockImplementation(() => mockTime.getTime());

			await publishNSIPSubscription('BC0110001', 'foo@example.org', [
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
});
