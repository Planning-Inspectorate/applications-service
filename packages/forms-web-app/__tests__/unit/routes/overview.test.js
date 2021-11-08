const { get } = require('./router-mock');
const overviewController = require('../../../src/controllers/overview');

describe('routes/overview', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/overview');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/:case_ref', overviewController.getOverview);
  });
});
