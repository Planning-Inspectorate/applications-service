const fetch = require('node-fetch');
const {
	postSubmission,
	postSubmissionComplete
} = require('../../../src/services/submission.service');
jest.mock('node-fetch', () => jest.fn());

describe('services/submission.service', () => {
	describe('#postSubmission', () => {
		describe('When submitting a form for a submission', () => {
			const caseRef = '1234';
			const body = 'mock body';
			describe('the post is successful', () => {
				let response;
				beforeEach(async () => {
					fetch.mockResolvedValue({
						json: () => ({ mockData: 'mock data' }),
						ok: true,
						status: 200
					});
					response = await postSubmission(caseRef, body);
				});
				it('should call fetch ', () => {
					expect(fetch).toHaveBeenCalledWith(
						'http://test/api/v1/submissions/1234',
						expect.objectContaining({
							body: 'mock body',
							headers: {
								'X-Correlation-ID': expect.any(String)
							},
							method: 'POST'
						})
					);
				});
				it('should return a body', () => {
					expect(response).toEqual({ data: { mockData: 'mock data' }, resp_code: 200 });
				});
			});
			describe('there is an error', () => {
				beforeEach(async () => {
					fetch.mockImplementation(() => {
						throw new Error('an error');
					});
				});
				it('should throw an error', async () => {
					await expect(postSubmission()).rejects.toThrow('an error');
				});
			});
		});
	});
	describe('#postSubmissionComplete', () => {
		describe('When submitting to submission compete', () => {
			const submissionsId = '1234';
			describe('the post is successful', () => {
				let response;
				beforeEach(async () => {
					fetch.mockResolvedValue({
						ok: true,
						status: 204
					});
					response = await postSubmissionComplete(submissionsId);
				});
				it('should call fetch ', () => {
					expect(fetch).toHaveBeenCalledWith(
						'http://test/api/v1/submissions/1234/complete',
						expect.objectContaining({
							headers: {
								'Content-Type': 'application/json',
								'X-Correlation-ID': expect.any(String)
							},
							method: 'POST'
						})
					);
				});
				it('should return a body', () => {
					expect(response).toEqual({ resp_code: 204 });
				});
			});
			describe('there is an error', () => {
				let result;
				beforeEach(async () => {
					fetch.mockImplementation(() => {
						throw new Error('an error');
					});
					result = await postSubmissionComplete();
				});
				it('should throw an error', async () => {
					expect(result).toEqual('ok');
				});
			});
		});
	});
});
