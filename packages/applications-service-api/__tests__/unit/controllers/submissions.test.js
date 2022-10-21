const httpMocks = require('node-mocks-http');

const { ORIGINAL_REQUEST_FILE_DATA, SUBMISSION_DATA, FILE_DATA } = require('../../__data__/file');
const { createSubmission } = require('../../../src/controllers/submissions');

jest.mock('../../../src/services/submission.service');
jest.mock('../../../src/services/ni.file.service');

const createSubmissionService =
	require('../../../src/services/submission.service').createSubmission;
const submitFileService = require('../../../src/services/ni.file.service').submitFile;

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
			createSubmissionService.mockResolvedValueOnce(SUBMISSION_DATA);
			submitFileService.mockResolvedValueOnce({
				...SUBMISSION_DATA,
				file: FILE_DATA
			});

			await createSubmission(requestWithFile, res);

			expect(submitFileService).toBeCalledWith(SUBMISSION_DATA, ORIGINAL_REQUEST_FILE_DATA);

			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual({
				...SUBMISSION_DATA,
				file: FILE_DATA
			});
		});

		it('should return representation if comment submitted', async () => {
			const res = httpMocks.createResponse();
			createSubmissionService.mockResolvedValueOnce({
				...SUBMISSION_DATA,
				representation: 'Some comment'
			});

			await createSubmission(requestWithComment, res);

			expect(submitFileService).not.toBeCalled();

			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual({
				...SUBMISSION_DATA,
				representation: 'Some comment'
			});
		});
	});
});
