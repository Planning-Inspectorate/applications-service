const httpMocks = require('node-mocks-http');

const { REQUEST_FILE_DATA } = require('../../__data__/file');
const { createSubmission, completeSubmission } = require('../../../src/controllers/submissions');

jest.mock('../../../src/services/submission.service');
jest.mock('../../../src/services/submission.ni.service');
jest.mock('../../../src/services/ni.file.service');
jest.mock('../../../src/utils/date-utils');

const { getDate } = require('../../../src/utils/date-utils');
const {
	createSubmission: createSubmissionService,
	completeSubmission: completeSubmissionService
} = require('../../../src/services/submission.service');

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
			file: REQUEST_FILE_DATA
		};

		const requestWithComment = {
			...request,
			body: {
				...request.body,
				representation: 'Some comment'
			}
		};

		const mockDate = new Date('2022-12-09 13:30:00');

		beforeEach(() => getDate.mockReturnValueOnce(mockDate));
		afterEach(() => jest.resetAllMocks());

		it('should invoke service with metadata and file for submission with file', async () => {
			const res = httpMocks.createResponse();

			createSubmissionService.mockResolvedValueOnce({ submissionId: 123 });

			await createSubmission(requestWithFile, res);

			expect(createSubmissionService).toBeCalledWith({
				metadata: {
					caseReference: 'EN010009',
					dateSubmitted: mockDate,
					deadline: 'Deadline 1',
					email: 'joe@example.org',
					interestedParty: true,
					ipReference: '999999999',
					lateSubmission: undefined,
					name: 'Joe Bloggs',
					representation: undefined,
					sensitiveData: undefined,
					submissionId: 123,
					submissionType: 'Some Type'
				},
				file: requestWithFile.file
			});
			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual({
				submissionId: 123
			});
		});

		it('should invoke service with metadata only for submission with comment', async () => {
			const res = httpMocks.createResponse();

			createSubmissionService.mockResolvedValueOnce({ submissionId: 123 });

			await createSubmission(requestWithComment, res);

			expect(createSubmissionService).toBeCalledWith({
				metadata: {
					caseReference: 'EN010009',
					dateSubmitted: mockDate,
					deadline: 'Deadline 1',
					email: 'joe@example.org',
					interestedParty: true,
					ipReference: '999999999',
					lateSubmission: undefined,
					name: 'Joe Bloggs',
					representation: 'Some comment',
					sensitiveData: undefined,
					submissionId: 123,
					submissionType: 'Some Type'
				},
				file: undefined
			});
			expect(res._getStatusCode()).toEqual(201);
			expect(res._getData()).toEqual({ submissionId: 123 });
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

		it.each([[{ email: 'person@example.org' }], [{ caseReference: 'BC0110001' }]])(
			'throws error if required request body property is missing',
			async (body) => {
				await expect(() =>
					completeSubmission(
						{
							...req,
							body
						},
						res
					)
				).rejects.toEqual({
					code: 400,
					message: {
						errors: ["must include both 'email' and 'caseReference'"]
					}
				});
			}
		);
	});
});
