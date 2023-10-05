const { use } = require('./router-mock');
const cookieRouter = require('../../../src/routes/cookies');
const projectsRouter = require('../../../src/pages/projects/projects.router');
const interestedPartyRouter = require('../../../src/routes/having-your-say-guide');
const footerPagesRouter = require('../../../src/routes/footer-pages');
const {
	registerOfApplicationsRouter
} = require('../../../src/pages/register-of-applications/router');
const { projectSearchRouter } = require('../../../src/pages/project-search/router');
const { apiRouter } = require('../../../src/api/router');

describe('routes/index', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../src/routes');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(use).toHaveBeenCalledWith('/cookies', cookieRouter);
		expect(use).toHaveBeenCalledWith('/projects', projectsRouter);
		expect(use).toHaveBeenCalledWith('/', projectSearchRouter);
		expect(use).toHaveBeenCalledWith('/', registerOfApplicationsRouter);
		expect(use).toHaveBeenCalledWith(interestedPartyRouter);
		expect(use).toHaveBeenCalledWith('/', footerPagesRouter);
		expect(use).toHaveBeenCalledWith('/api', apiRouter);
		expect(use.mock.calls.length).toBe(38);
	});
});
