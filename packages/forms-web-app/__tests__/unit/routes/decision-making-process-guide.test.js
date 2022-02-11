const { get } = require('./router-mock');
const {
  getDecisionMakingProcessGuide,
} = require('../../../src/controllers/decision-making-process-guide');

describe('routes/decision-making-process-guide', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/decision-making-process-guide');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/decision-making-process-guide',
      getDecisionMakingProcessGuide
    );
  });
});
