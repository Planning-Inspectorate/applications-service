const { use } = require('./router-mock');
const registerRouter = require('../../../src/routes/register');
const cookieRouter = require('../../../src/routes/cookies');
const projectsRouter = require('../../../src/pages/projects/projects.router');
const projectSearchRouter = require('../../../src/routes/project-search');
const interestedPartyRouter = require('../../../src/routes/having-your-say-guide');
const footerPagesRouter = require('../../../src/routes/footer-pages');

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
		expect(use).toHaveBeenCalledWith('/register', registerRouter);
		expect(use).toHaveBeenCalledWith('/projects', projectsRouter);
		expect(use).toHaveBeenCalledWith('/project-search', projectSearchRouter);
		expect(use).toHaveBeenCalledWith(interestedPartyRouter);
		expect(use).toHaveBeenCalledWith('/', footerPagesRouter);
		expect(use.mock.calls.length).toBe(10);
	});
});
