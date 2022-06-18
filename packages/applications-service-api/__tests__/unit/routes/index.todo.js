const { use } = require('./router-mock');
const applicationsRouter = require('../../../src/routes/applications');
// const apiDocsRouter = require('../../../src/routes/api-docs');

describe('routes/index', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(use).toHaveBeenCalledWith('/api/v1/applications', applicationsRouter);
		// expect(use).toHaveBeenCalledWith('/api-docs', apiDocsRouter);
		expect(use.mock.calls.length).toBe(1);
	});
});
