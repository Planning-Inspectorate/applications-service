const { get } = require('../router-mock');
const startController = require('../../../../src/controllers/register/myself/start');

describe('routes/register/myself/start', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/register/myself/start');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/start', startController.getStart);
  });


});
