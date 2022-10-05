const httpMocks = require('node-mocks-http');

const { PNG_FILE } = require("../../__data__/file");
const { createSubmission } = require('../../../src/controllers/submissions');

jest.mock('../../../src/services/submission.service');
jest.mock('../../../src/services/ni.api.service');

const createSubmissionService = require('../../../src/services/submission.service').createSubmission;
const updateSubmissionService = require('../../../src/services/submission.service').updateSubmission;
const uploadFileService = require('../../../src/services/ni.api.service').uploadFile;

describe('submissions controller', () => {
	describe('createSubmission', () => {
		const request = {
			params: {
				caseReference: 'EN010120'
			},
			body: {
				name: 'Joe Bloggs',
				email: 'joe@example.org',
				interestedParty: true,
				ipReference: '999999999',
				deadline: 'Deadline 1',
				submissionType: 'Some Type',
				submissionId: 123
			}
		};

		const requestWithFile = {
			...request,
			file: {
				fieldname: 'file',
				originalname: 'Test.png',
				encoding: '7bit',
				mimetype: 'image/png',
				buffer: PNG_FILE,
				size: 83
			}
		};

		const requestWithComment = {
			...request,
			body: {
				...request.body,
				representation: "Some comment"
			}
		};

		const submissionData = {
			id: 123,
			name: 'Joe Bloggs',
			email: 'joe@example.org',
			interestedParty: true,
			ipReference: '999999999',
			deadline: 'Deadline 1',
			submissionType: 'Some Type',
			submissionId: 123,
			caseReference: 'EN010120'
		};

		const fileData = {
			name: 'Test-123-1.png',
			originalName: 'Test.png',
			size: 83,
			md5: '3ac9e57c0901b59075291537496aaf06'
		};

		afterEach(() => jest.resetAllMocks());

		it('should return file name including submissionId and sequence number if file uploaded', async () => {
			const res = httpMocks.createResponse();
			createSubmissionService.mockResolvedValueOnce(submissionData)

			await createSubmission(requestWithFile, res);

			expect(uploadFileService).toBeCalledWith({
				buffer: PNG_FILE,
				fileName: 'Test-123-1.png',
				mimeType: 'image/png',
				size: 83
			});
			expect(updateSubmissionService).toBeCalledWith({
				id: 123,
				file: fileData
			});
			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual({
				...submissionData,
				file: fileData
			});
		});

		it('should return representation if comment submitted', async () => {
			const res = httpMocks.createResponse();
			createSubmissionService.mockResolvedValueOnce({
				...submissionData,
				representation: 'Some comment'
			})

			await createSubmission(requestWithComment, res);

			expect(uploadFileService).not.toBeCalled();
			expect(updateSubmissionService).not.toBeCalled();

			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual({
				...submissionData,
				representation: 'Some comment'
			});
		});

		it('should return 400 error if neither representation nor file submitted', async () => {
			const res = httpMocks.createResponse();

			await createSubmission(
				{
					params: {
						caseReference: 'EN010120'
					},
					body: {
						name: 'Mr No File or Representation'
					}
				},
				res
			);

			expect(res._getStatusCode()).toEqual(400);
		});
	});
});