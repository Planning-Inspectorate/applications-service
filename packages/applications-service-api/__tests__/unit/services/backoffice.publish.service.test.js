jest.mock('../../../src/lib/eventClient');
jest.mock('../../../src/utils/date-utils');

const { sendMessages } = require('../../../src/lib/eventClient');
const { getDate } = require('../../../src/utils/date-utils');
const {
	publishCreateNSIPSubscription,
	publishDeleteNSIPSubscription,
	publishDeadlineSubmission,
	publishRegisterRepresentation
} = require('../../../src/services/backoffice.publish.service');
const { SUBMISSION_DATA } = require('../../__data__/submission');
const { REQUEST_FILE_DATA } = require('../../__data__/file');
const { INTERESTED_PARTY_SELF_BACK_OFFICE } = require('../../__data__/interestedParty');

describe('back office publish service', () => {
	afterEach(() => jest.resetAllMocks());

	describe('publishDeadlineSubmission', () => {
		it('invokes event client with correct message', async () => {
			const mockGuid = 'd3ae5a1c-6b97-4708-a61f-217670ebaba1';

			await publishDeadlineSubmission(
				{
					...SUBMISSION_DATA,
					file: REQUEST_FILE_DATA
				},
				mockGuid
			);
			expect(sendMessages).toBeCalledWith('deadline-submission-topic', [
				{
					body: {
						caseReference: 'EN010120',
						name: 'Joe Bloggs',
						email: 'joe@example.org',
						interestedParty: true,
						interestedPartyReference: '999999999',
						deadline: 'Deadline 1',
						submissionType: 'Some Type',
						sensitiveData: undefined,
						lateSubmission: undefined,
						submissionId: 123,
						blobGuid: mockGuid,
						documentName: 'Test.png'
					},
					contentType: 'application/json',
					applicationProperties: {}
				}
			]);
		});
	});

	describe('publishCreateNSIPSubscription', () => {
		const mockTime = new Date('2023-07-06T11:06:00.000Z');

		it('invokes event client with correct message', async () => {
			getDate.mockReturnValueOnce(mockTime);

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
							emailAddress: 'foo@example.org'
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

	describe('publishRegisterRepresentation', () => {
		it('invokes event client with correct message', async () => {
			await publishRegisterRepresentation(INTERESTED_PARTY_SELF_BACK_OFFICE);

			expect(sendMessages).toBeCalledWith('register-representation', [
				{
					body: INTERESTED_PARTY_SELF_BACK_OFFICE,
					contentType: 'application/json',
					applicationProperties: {
						version: '0.1',
						type: 'Publish'
					}
				}
			]);
		});
	});
});
