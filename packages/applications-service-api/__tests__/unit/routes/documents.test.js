const { post } = require('./router-mock');
const documentsController = require('../../../src/controllers/documents');

describe('routes/documents', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes/documents');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(post).toHaveBeenCalledWith('/:caseRef', documentsController.getDocuments);
	});
});
