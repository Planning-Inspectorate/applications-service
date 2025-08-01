const { generateId } = require('../../../src/utils/generate-id');
const {
	createNISubmission,
	completeNISubmission
} = require('../../../src/services/submission.ni.service');
const {
	generateRepresentationPDF,
	uploadSubmissionFileToBlobStorage
} = require('../../../src/utils/file');
const { publishDeadlineSubmission } = require('../../../src/services/backoffice.publish.service');
const { getApplication } = require('../../../src/services/application.backoffice.service');
const { sendSubmissionNotification } = require('../../../src/lib/notify');
const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');

const {
	createSubmission,
	completeSubmission
} = require('../../../src/services/submission.service');
const { REQUEST_FILE_DATA } = require('../../__data__/file');
const { SUBMISSION_DATA } = require('../../__data__/submission');
const { APPLICATION_API } = require('../../__data__/application');
const BACK_OFFICE_CASE_REFERENCE = 'BC0110001';

jest.mock('../../../src/lib/config', () => ({
	backOfficeIntegration: {
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

jest.mock('../../../src/utils/file');
jest.mock('../../../src/services/submission.ni.service');
jest.mock('../../../src/services/backoffice.publish.service');
jest.mock('../../../src/services/application.backoffice.service');
jest.mock('../../../src/lib/notify');
jest.mock('../../../src/utils/generate-id');
jest.mock('../../../src/utils/is-backoffice-case-reference');

describe('submission.service', () => {
	beforeAll(() => {
		isBackOfficeCaseReference.mockImplementation(
			(caseReference) => caseReference === BACK_OFFICE_CASE_REFERENCE
		);
	});
	describe('createSubmission', () => {
		describe('Back Office case', () => {
			const mockGuid = 'd3ae5a1c-6b97-4708-a61f-217670ebaba1';
			beforeEach(() => uploadSubmissionFileToBlobStorage.mockResolvedValueOnce(mockGuid));

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

						expect(uploadSubmissionFileToBlobStorage).toBeCalledWith(submission.file);
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

						expect(uploadSubmissionFileToBlobStorage).toBeCalledWith(
							generatedRepresentationFileData
						);
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
				beforeAll(() => {
					generateId.mockReturnValue('S3AAB2CF4');
				});

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

						expect(uploadSubmissionFileToBlobStorage).toBeCalledWith(submission.file);
						expect(publishDeadlineSubmission).toBeCalledWith(submission, mockGuid);
						expect(result).toEqual({ submissionId: 'S3AAB2CF4' });
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

						expect(uploadSubmissionFileToBlobStorage).toBeCalledWith(
							generatedRepresentationFileData
						);
						expect(publishDeadlineSubmission).toBeCalledWith(
							{
								...submission,
								file: generatedRepresentationFileData
							},
							mockGuid
						);
						expect(result).toEqual({ submissionId: 'S3AAB2CF4' });
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

	describe('completeSubmission', () => {
		describe('Back Office case', () => {
			const submissionDetails = {
				submissionId: 1,
				caseReference: BACK_OFFICE_CASE_REFERENCE,
				email: 'person@example.org'
			};

			it('sends submission notification', async () => {
				getApplication.mockResolvedValueOnce(APPLICATION_API);

				await completeSubmission(submissionDetails);

				expect(sendSubmissionNotification).toBeCalledWith({
					submissionId: 1,
					email: 'person@example.org',
					project: {
						name: APPLICATION_API.projectName,
						email: APPLICATION_API.projectEmailAddress
					}
				});
			});

			it('sends submission notification - Welsh region case, Welsh project name', async () => {
				getApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					regions: ['wales'],
					projectNameWelsh: 'Welsh project name'
				});

				await completeSubmission(submissionDetails);

				expect(sendSubmissionNotification).toBeCalledWith({
					submissionId: 1,
					email: 'person@example.org',
					project: {
						name: APPLICATION_API.projectName,
						welshName: 'Welsh project name',
						email: APPLICATION_API.projectEmailAddress
					}
				});
			});

			it('sends submission notification - Welsh region case, no Welsh project name', async () => {
				getApplication.mockResolvedValueOnce({ ...APPLICATION_API, regions: ['wales'] });

				await completeSubmission(submissionDetails);

				expect(sendSubmissionNotification).toBeCalledWith({
					submissionId: 1,
					email: 'person@example.org',
					project: {
						name: APPLICATION_API.projectName,
						welshName: APPLICATION_API.projectName,
						email: APPLICATION_API.projectEmailAddress
					}
				});
			});

			it('throws error if application not found', async () => {
				getApplication.mockResolvedValueOnce(null);

				await expect(() => completeSubmission(submissionDetails)).rejects.toEqual({
					code: 404,
					message: {
						errors: ['Project with case reference BC0110001 not found']
					}
				});
			});
		});

		describe('NI case', () => {
			it('invokes createNISubmission', async () => {
				await completeSubmission({
					caseReference: 'EN010120',
					email: 'person@example.org',
					submissionId: 1
				});

				expect(completeNISubmission).toBeCalledWith(1);
			});
		});
	});
});
