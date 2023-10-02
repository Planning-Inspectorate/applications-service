const { SUBMISSION_DATA } = require('../../__data__/submission');

jest.mock('../../../src/lib/config', () => ({
	backOfficeIntegration: {
		submissions: {
			postSubmission: {
				caseReferences: ['BC0110001']
			}
		}
	},
	logger: {
		level: 'info'
	},
	ni: {}
}));

jest.mock('../../../src/services/submission.ni.service');

const { createSubmission } = require('../../../src/services/submission.service');
const { createNISubmission } = require('../../../src/services/submission.ni.service');

describe('submission.service', () => {
	describe('createSubmission', () => {
		describe('Back Office case', () => {
			const submission = {
				metadata: {
					...SUBMISSION_DATA,
					caseReference: 'BC0110001'
				}
			};

			it('throws', async () => {
				await expect(createSubmission(submission)).rejects.toEqual('Not Implemented');
			});
		});

		describe('NI case', () => {
			const submission = {
				metadata: {
					...SUBMISSION_DATA,
					caseReference: 'EN010009'
				}
			};

			it('invokes createNISubmission', async () => {
				await createSubmission(submission);

				expect(createNISubmission).toBeCalledWith(submission);
			});
		});
	});
});
