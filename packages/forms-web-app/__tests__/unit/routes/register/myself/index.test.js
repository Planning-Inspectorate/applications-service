const { use } = require('../../router-mock');

describe('routes/register/myself/index', () => {
  beforeEach(() => {
    jest.resetModules();

    // eslint-disable-next-line global-require
    require('../../../../../src/routes/register/myself');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(use.mock.calls.length).toBe(11);
  });
});
