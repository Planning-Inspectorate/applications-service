const { fileUploadLimitHandler } = require('../../../src/middleware/fileUploadLimitHandler');

describe('fileUploadLimitHandler middleware', () => {
	describe('fileUploadLimitHandler', () => {
		const httpMocks = require('node-mocks-http');

		it('returns 400 error with message', () => {
			const res = httpMocks.createResponse();

			fileUploadLimitHandler({}, res, {});

			expect(res._getStatusCode()).toEqual(400);
			expect(res._getJSONData()).toEqual({
				code: 400,
				errors: ['file size must be less than 50.00MB']
			});
		});
	});
});
