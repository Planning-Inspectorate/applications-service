const { use } = require('./router-mock');
const registerRouter = require('../../../src/routes/register');
const homeRouter = require('../../../src/routes/home');
const cookieRouter = require('../../../src/routes/cookies');
const overviewRouter = require('../../../src/routes/overview');
const projectSearchRouter = require('../../../src/routes/project-search');
const interestedPartyRouter = require('../../../src/routes/interested-party-guide');

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
    expect(use).toHaveBeenCalledWith('/overview', overviewRouter);
    expect(use).toHaveBeenCalledWith('/project-search', projectSearchRouter);
    expect(use).toHaveBeenCalledWith(interestedPartyRouter);
    expect(use.mock.calls.length).toBe(7);
  });
});
