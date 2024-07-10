const { post, get } = require('./router-mock');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');

describe('routes/documents', () => {
	beforeEach(() => {
		require('../../../src/routes/documents');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(post).toHaveBeenCalledWith('', validateRequestWithOpenAPI, expect.any(Function));
		expect(get).toHaveBeenCalledWith(
			'/:caseReference',
			validateRequestWithOpenAPI,
			expect.any(Function)
		);
	});
});
