const { use } = require('./router-mock');
const { pagesRouter } = require('../../../src/pages/router');
const { apiRouter } = require('../../../src/api/router');
const { processGuideRouter } = require('../../../src/pages/process-guide/router');
const { haveYourSayGuideRouter } = require('../../../src/pages/have-your-say-guide/router');
const {
	shortDocLinkRedirectRouter
} = require('../../../src/pages/redirects/short-document-link//router');

const {
	accessibilityStatementRouter
} = require('../../../src/pages/accessibility-statement/router');
const { addGlobalMiddleware } = require('../../../src/pages/_middleware/add-global-middleware');

jest.mock('../../../src/config', () => {
	const originalConfig = jest.requireActual('../../../src/config');
	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true
		}
	};
});

describe('routes/index', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(use).toHaveBeenCalledWith(addGlobalMiddleware);
		expect(use).toHaveBeenCalledWith(shortDocLinkRedirectRouter);
		expect(use).toHaveBeenCalledWith(pagesRouter);
		expect(use).toHaveBeenCalledWith(accessibilityStatementRouter);
		expect(use).toHaveBeenCalledWith(haveYourSayGuideRouter);
		expect(use).toHaveBeenCalledWith(processGuideRouter);
		expect(use).toHaveBeenCalledWith('/api', apiRouter);
		expect(use.mock.calls.length).toBe(10);
	});
});
