const {
	createNISubmission,
	completeNISubmission
} = require('../../../src/services/submission.ni.service');
const { APPLICATION_FO } = require('../../__data__/application');

jest.mock('../../../src/lib/notify');
const sendSubmissionNotificationMock =
	require('../../../src/lib/notify').sendSubmissionNotification;

jest.mock('../../../src/repositories/submission.ni.repository');
const {
	getSubmission: getSubmissionRepository,
	createSubmission: createSubmissionRepository,
	updateSubmission: updateSubmissionRepository,
	updateSubmissionsBySubmissionId: updateSubmissionsBySubmissionIdRepository
} = require('../../../src/repositories/submission.ni.repository');

jest.mock('../../../src/services/ni.file.service');
const {
	submitUserUploadedFile,
	submitRepresentationFile
} = require('../../../src/services/ni.file.service');

jest.mock('../../../src/services/application.ni.service');
const { getNIApplication } = require('../../../src/services/application.ni.service');
const {
	SUBMISSION_DATA,
	SUBMISSION_DB_CREATE_INPUT,
	SUBMISSION_DB_CREATE_OUTPUT
} = require('../../__data__/submission');
const { REQUEST_FILE_DATA } = require('../../__data__/file');

describe('submission service', () => {
	beforeEach(() => jest.resetAllMocks());

	describe('createNISubmission', () => {
		describe('submission with representation text provided', () => {
			it('creates submission with provided submissionId, generates representation file', async () => {
				createSubmissionRepository.mockResolvedValueOnce(SUBMISSION_DB_CREATE_OUTPUT);

				const result = await createNISubmission(SUBMISSION_DATA);

				expect(createSubmissionRepository).toBeCalledWith(SUBMISSION_DB_CREATE_INPUT);
				expect(submitRepresentationFile).toBeCalledWith(SUBMISSION_DB_CREATE_OUTPUT);
				expect(submitUserUploadedFile).not.toBeCalled();
				expect(updateSubmissionRepository).not.toBeCalled();

				expect(result).toEqual({ submissionId: 123 });
			});

			it('creates submission, updates with generated submissionId, generates representation file', async () => {
				createSubmissionRepository.mockResolvedValueOnce(SUBMISSION_DB_CREATE_OUTPUT);

				const result = await createNISubmission({
					metadata: {
						...SUBMISSION_DATA.metadata,
						submissionId: undefined
					}
				});

				expect(createSubmissionRepository).toBeCalledWith({
					...SUBMISSION_DB_CREATE_INPUT,
					submissionId: 0 // dummy submission id to satisfy non-null requirement in ni db
				});
				expect(submitRepresentationFile).toBeCalledWith(SUBMISSION_DB_CREATE_OUTPUT);
				expect(submitUserUploadedFile).not.toBeCalled();
				expect(updateSubmissionRepository).toBeCalledWith(123, {
					submissionId: 123
				});

				expect(result).toEqual({ submissionId: 123 });
			});
		});

		describe('submission with user file upload', () => {
			it('creates submission and stores user uploaded file', async () => {
				createSubmissionRepository.mockResolvedValueOnce({
					...SUBMISSION_DB_CREATE_OUTPUT,
					representation: undefined
				});

				const result = await createNISubmission({
					metadata: {
						...SUBMISSION_DATA.metadata,
						representation: undefined
					},
					file: REQUEST_FILE_DATA
				});

				expect(createSubmissionRepository).toBeCalledWith({
					...SUBMISSION_DB_CREATE_INPUT,
					representation: undefined
				});
				expect(submitRepresentationFile).not.toBeCalled();
				expect(submitUserUploadedFile).toBeCalledWith(
					{ ...SUBMISSION_DB_CREATE_OUTPUT, representation: undefined },
					REQUEST_FILE_DATA
				);
				expect(updateSubmissionRepository).not.toBeCalled();

				expect(result).toEqual({ submissionId: 123 });
			});
		});
	});

	it('returns apierror if db create fails with ER_TRUNCATED_WRONG_VALUE_FOR_FIELD encoding/collation error', async () => {
		createSubmissionRepository.mockRejectedValueOnce({
			name: 'SequelizeDatabaseError',
			parent: {
				code: 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
			},
			message: 'some error'
		});

		// utf8 value unsupported by db
		await expect(createNISubmission({ metadata: { representation: '🐦‍⬛' } })).rejects.toEqual({
			code: 400,
			message: {
				errors: ['some error']
			}
		});
	});

	describe('completeNISubmission', () => {
		const submissionId = 123;

		it('invokes notify service and mark as validated if submission with given id is found', async () => {
			const mockTime = new Date('2022-12-09 13:30:00');
			jest.useFakeTimers().setSystemTime(mockTime);

			getSubmissionRepository.mockResolvedValueOnce({
				id: submissionId,
				...SUBMISSION_DB_CREATE_OUTPUT
			});
			updateSubmissionsBySubmissionIdRepository.mockResolvedValueOnce({
				id: submissionId,
				...SUBMISSION_DB_CREATE_OUTPUT,
				validated: mockTime
			});
			getNIApplication.mockResolvedValueOnce(APPLICATION_FO);

			await completeNISubmission(submissionId);

			expect(updateSubmissionsBySubmissionIdRepository).toBeCalledWith(submissionId, {
				validated: mockTime
			});
			expect(sendSubmissionNotificationMock).toBeCalledWith({
				submissionId: submissionId,
				email: 'joe@example.org',
				project: {
					name: APPLICATION_FO.ProjectName,
					email: APPLICATION_FO.ProjectEmailAddress
				}
			});
		});

		it('throws not found error if no submission with given id is found', async () => {
			getSubmissionRepository.mockResolvedValueOnce(null);

			await expect(completeNISubmission(123456789)).rejects.toEqual({
				code: 404,
				message: {
					errors: ['Submission with ID 123456789 not found']
				}
			});

			expect(sendSubmissionNotificationMock).not.toBeCalled();
		});

		it('throws not found error if no project with given id is found', async () => {
			const submissionData = {
				id: submissionId,
				submissionId: submissionId,
				email: 'someone@example.com',
				caseReference: 'EN010116'
			};

			getSubmissionRepository.mockResolvedValueOnce(submissionData);
			getNIApplication.mockResolvedValueOnce(null);

			await expect(completeNISubmission(123456789)).rejects.toEqual({
				code: 404,
				message: {
					errors: ['Project with case reference EN010116 not found']
				}
			});

			expect(sendSubmissionNotificationMock).not.toBeCalled();
		});
	});
});
