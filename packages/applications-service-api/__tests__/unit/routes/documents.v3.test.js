const { post } = require('./router-mock');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');

describe('routes/documentsV3', () => {
	beforeEach(() => {
		require('../../../src/routes/documents.v3');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(post).toHaveBeenCalledWith('', validateRequestWithOpenAPI, expect.any(Function));
		expect(post.mock.calls[0][2].name).toEqual('getDocumentsRoute');
	});
});
