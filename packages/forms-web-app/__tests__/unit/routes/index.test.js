const { use } = require('./router-mock');
const { pagesRouter } = require('../../../src/pages/router');
const cookieRouter = require('../../../src/routes/cookies');
const footerPagesRouter = require('../../../src/routes/footer-pages');
const {
	registerOfApplicationsRouter
} = require('../../../src/pages/register-of-applications/router');
const { projectSearchRouter } = require('../../../src/pages/project-search/router');
const { apiRouter } = require('../../../src/api/router');
const { processGuideRouter } = require('../../../src/pages/process-guide/router');
const { haveYourSayGuideRouter } = require('../../../src/pages/have-your-say-guide/router');

const {
	accessibilityStatementRouter
} = require('../../../src/pages/accessibility-statement/router');

jest.mock('../../../src/config', () => {
	const originalConfig = jest.requireActual('../../../src/config');
	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true,
			usePrivateBetaV1RoutesOnly: false
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
		expect(use).toHaveBeenCalledWith(pagesRouter);
		expect(use).toHaveBeenCalledWith(accessibilityStatementRouter);
		expect(use).toHaveBeenCalledWith('/cookies', cookieRouter);
		expect(use).toHaveBeenCalledWith('/', projectSearchRouter);
		expect(use).toHaveBeenCalledWith('/', registerOfApplicationsRouter);
		expect(use).toHaveBeenCalledWith('/', footerPagesRouter);
		expect(use).toHaveBeenCalledWith(haveYourSayGuideRouter);
		expect(use).toHaveBeenCalledWith(processGuideRouter);
		expect(use).toHaveBeenCalledWith('/api', apiRouter);
		expect(use.mock.calls.length).toBe(34);
	});
});
