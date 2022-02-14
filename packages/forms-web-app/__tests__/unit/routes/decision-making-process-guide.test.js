const { get } = require('./router-mock');
const {
  getDecisionMakingProcessGuide,
  getPreApplication,
  getExaminationOfTheApplication,
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
    expect(get).toHaveBeenCalledWith(
      '/decision-making-process-guide/pre-application',
      getPreApplication
    );
    expect(get).toHaveBeenCalledWith(
      '/decision-making-process-guide/examination-of-the-application',
      getExaminationOfTheApplication
    );
  });
});
