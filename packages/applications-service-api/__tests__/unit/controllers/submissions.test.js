const httpMocks = require('node-mocks-http');

const { ORIGINAL_REQUEST_FILE_DATA, SUBMISSION_DATA, FILE_DATA } = require('../../__data__/file');
const { createSubmission, completeSubmission } = require('../../../src/controllers/submissions');

jest.mock('../../../src/services/submission.service');
jest.mock('../../../src/services/ni.file.service');

const createSubmissionService =
	require('../../../src/services/submission.service').createSubmission;
const completeSubmissionService =
	require('../../../src/services/submission.service').completeSubmission;
const submitUserUploadedFileService =
	require('../../../src/services/ni.file.service').submitUserUploadedFile;
const submitRepresentationFileService =
	require('../../../src/services/ni.file.service').submitRepresentationFile;

describe('submissions controller', () => {
	describe('createSubmission', () => {
		const request = {
			headers: {
				'content-type':
					'multipart/form-data; boundary=--------------------------002628336047044988377296',
				'content-length': '1010'
			},
			body: {
				name: 'Joe Bloggs',
				email: 'joe@example.org',
				interestedParty: true,
				ipReference: '999999999',
				deadline: 'Deadline 1',
				submissionType: 'Some Type',
				submissionId: 123
			},
			params: {
				caseReference: 'EN010009'
			},
			query: {}
		};

		const requestWithFile = {
			...request,
			file: ORIGINAL_REQUEST_FILE_DATA
		};

		const requestWithComment = {
			...request,
			body: {
				...request.body,
				representation: 'Some comment'
			}
		};

		afterEach(() => jest.resetAllMocks());

		it('should return file name including submissionId and sequence number if file uploaded', async () => {
			const res = httpMocks.createResponse();
			const submissionDataWithFile = {
				...SUBMISSION_DATA,
				file: FILE_DATA
			};

			createSubmissionService.mockResolvedValueOnce(SUBMISSION_DATA);
			submitUserUploadedFileService.mockResolvedValueOnce(submissionDataWithFile);

			await createSubmission(requestWithFile, res);

			expect(submitUserUploadedFileService).toBeCalledWith(
				SUBMISSION_DATA,
				ORIGINAL_REQUEST_FILE_DATA
			);
			expect(submitRepresentationFileService).not.toBeCalled();

			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual(submissionDataWithFile);
		});

		it('should return representation and generated pdf file if comment submitted', async () => {
			const res = httpMocks.createResponse();
			const submissionDataWithRepresentation = {
				...SUBMISSION_DATA,
				representation: 'Some comment'
			};

			createSubmissionService.mockResolvedValueOnce(submissionDataWithRepresentation);
			submitRepresentationFileService.mockResolvedValueOnce(Promise.resolve());

			await createSubmission(requestWithComment, res);

			expect(submitUserUploadedFileService).not.toBeCalled();
			expect(submitRepresentationFileService).toBeCalledWith(submissionDataWithRepresentation);

			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual(submissionDataWithRepresentation);
		});
	});

	describe('completeSubmission', () => {
		const req = {
			params: {
				submissionId: 1
			}
		};
		const res = httpMocks.createResponse();

		it('returns successful response when service completes without throwing', async () => {
			completeSubmissionService.mockResolvedValueOnce();

			await completeSubmission(req, res);

			expect(res._getStatusCode()).toEqual(204);
		});

		it('throws if service throws', async () => {
			completeSubmissionService.mockRejectedValueOnce('some error');

			await expect(completeSubmission(req, res)).rejects.toEqual('some error');
		});
	});
});
