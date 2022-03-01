const { get } = require('../router-mock');
const startController = require('../../../../src/controllers/register/start');

describe('routes/register/start', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/register/start');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/:case_ref', startController.getStart);
    expect(get).toHaveBeenCalledWith('/:case_ref/start', startController.getStart);
  });
});
