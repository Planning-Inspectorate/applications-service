const { use } = require('./router-mock');
const registerRouter = require('../../../src/routes/register');
const homeRouter = require('../../../src/routes/home');
const cookieRouter = require('../../../src/routes/cookies');

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
    expect(use.mock.calls.length).toBe(11);
  });
});
