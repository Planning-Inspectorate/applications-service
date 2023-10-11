const BACK_OFFICE_CASE_REFERENCE = 'BC0110001';
jest.mock('../../../src/lib/config', () => ({
	backOfficeIntegration: {
		submissions: {
			postSubmission: {
				caseReferences: [BACK_OFFICE_CASE_REFERENCE]
			}
		},
		serviceBus: {
			enabled: false,
			topics: {
				REGISTER_NSIP_SUBSCRIPTION: 'register-nsip-subscription',
				DEADLINE_SUBMISSION: 'deadline-submission-topic'
			}
		}
	},
	logger: {
		level: 'info'
	},
	ni: {}
}));

jest.mock('../../../src/utils/date-utils');
jest.mock('../../../src/utils/file');
jest.mock('../../../src/services/submission.ni.service');
jest.mock('../../../src/services/backoffice.publish.service');

const { getDate } = require('../../../src/utils/date-utils');
const { createNISubmission } = require('../../../src/services/submission.ni.service');
const { generateRepresentationPDF, uploadToBlobStorage } = require('../../../src/utils/file');
const { publishDeadlineSubmission } = require('../../../src/services/backoffice.publish.service');

const { createSubmission } = require('../../../src/services/submission.service');
const { REQUEST_FILE_DATA } = require('../../__data__/file');
const { SUBMISSION_DATA } = require('../../__data__/submission');

describe('submission.service', () => {
	describe('createSubmission', () => {
		describe('Back Office case', () => {
			const mockGuid = 'd3ae5a1c-6b97-4708-a61f-217670ebaba1';
			beforeEach(() => uploadToBlobStorage.mockResolvedValueOnce(mockGuid));

			describe('submission with submissionId supplied', () => {
				describe('submission with user uploaded file', () => {
					it('publishes message with submission metadata and uploads user file', async () => {
						const submission = {
							metadata: {
								...SUBMISSION_DATA.metadata,
								caseReference: BACK_OFFICE_CASE_REFERENCE,
								representation: undefined
							},
							file: REQUEST_FILE_DATA
						};

						const result = await createSubmission(submission);

						expect(uploadToBlobStorage).toBeCalledWith(submission.file);
						expect(publishDeadlineSubmission).toBeCalledWith(submission, mockGuid);
						expect(result).toEqual({ submissionId: submission.metadata.submissionId });
					});
				});

				describe('submission with written representation', () => {
					it('publishes message with submission metadata and uploads generated file', async () => {
						const submission = {
							metadata: {
								...SUBMISSION_DATA.metadata,
								caseReference: BACK_OFFICE_CASE_REFERENCE,
								representation: 'some rep'
							}
						};

						const generatedRepresentationFileData = {
							name: 'Written-Representation-123.pdf',
							originalName: 'Written-Representation-123.pdf',
							buffer: Buffer.from([0]),
							size: 1,
							md5: 'examplemd5',
							mimeType: 'application/pdf'
						};

						generateRepresentationPDF.mockReturnValueOnce(generatedRepresentationFileData);

						const result = await createSubmission(submission);

						expect(uploadToBlobStorage).toBeCalledWith(generatedRepresentationFileData);
						expect(publishDeadlineSubmission).toBeCalledWith(
							{
								...submission,
								file: generatedRepresentationFileData
							},
							mockGuid
						);
						expect(result).toEqual({ submissionId: submission.metadata.submissionId });
					});
				});
			});

			describe('submission without submissionId', () => {
				const mockTime = new Date('2023-12-30T11:06:13.245Z');
				beforeEach(() => getDate.mockReturnValueOnce(mockTime));

				describe('submission with user uploaded file', () => {
					it('publishes message with submission metadata and uploads user file', async () => {
						const submission = {
							metadata: {
								...SUBMISSION_DATA.metadata,
								caseReference: BACK_OFFICE_CASE_REFERENCE,
								representation: undefined,
								submissionId: undefined
							},
							file: REQUEST_FILE_DATA
						};

						const result = await createSubmission(submission);

						expect(uploadToBlobStorage).toBeCalledWith(submission.file);
						expect(publishDeadlineSubmission).toBeCalledWith(submission, mockGuid);
						expect(result).toEqual({ submissionId: 'BC0110001-301223110613245' });
					});
				});

				describe('submission with written representation', () => {
					it('publishes message with submission metadata and uploads generated file', async () => {
						const submission = {
							metadata: {
								...SUBMISSION_DATA.metadata,
								caseReference: BACK_OFFICE_CASE_REFERENCE,
								representation: 'some rep',
								submissionId: undefined
							}
						};

						const generatedRepresentationFileData = {
							name: 'Written-Representation-BC0110001-301223110613245.pdf',
							originalName: 'Written-Representation-BC0110001-301223110613245.pdf',
							buffer: Buffer.from([0]),
							size: 1,
							md5: 'examplemd5',
							mimeType: 'application/pdf'
						};

						generateRepresentationPDF.mockReturnValueOnce(generatedRepresentationFileData);

						const result = await createSubmission(submission);

						expect(uploadToBlobStorage).toBeCalledWith(generatedRepresentationFileData);
						expect(publishDeadlineSubmission).toBeCalledWith(
							{
								...submission,
								file: generatedRepresentationFileData
							},
							mockGuid
						);
						expect(result).toEqual({ submissionId: 'BC0110001-301223110613245' });
					});
				});
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
