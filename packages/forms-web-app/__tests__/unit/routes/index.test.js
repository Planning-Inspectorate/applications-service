const { use } = require('./router-mock');
const registerRouter = require('../../../src/routes/register');
const homeRouter = require('../../../src/routes/home');
const cookieRouter = require('../../../src/routes/cookies');
const examinationRouter = require('../../../src/routes/examination');
const projectSearchRouter = require('../../../src/routes/project-search');
const interestedPartyRouter = require('../../../src/routes/interested-party-guide');
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
    expect(use).toHaveBeenCalledWith('/', homeRouter);
    expect(use).toHaveBeenCalledWith('/cookies', cookieRouter);
    expect(use).toHaveBeenCalledWith('/register', registerRouter);
    expect(use).toHaveBeenCalledWith('/examination', examinationRouter);
    expect(use).toHaveBeenCalledWith('/project-search', projectSearchRouter);
    expect(use).toHaveBeenCalledWith(interestedPartyRouter);
    expect(use).toHaveBeenCalledWith('/', footerPagesRouter);
    expect(use.mock.calls.length).toBe(9);
  });
});
