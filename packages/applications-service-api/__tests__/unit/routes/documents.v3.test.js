const { post } = require('./router-mock');
const documentsController = require('../../../src/controllers/documents.v3');
const { validateRequestWithOpenAPI } = require('../../../src/middleware/validator/openapi');

describe('routes/documentsV3', () => {
	beforeEach(() => {
		require('../../../src/routes/documents.v3');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(post).toHaveBeenCalledWith(
			'',
			validateRequestWithOpenAPI,
			documentsController.getDocuments
		);
	});
});
