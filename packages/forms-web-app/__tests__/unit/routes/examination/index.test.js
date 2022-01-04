const { get } = require('../router-mock');
const examinationController = require('../../../../src/controllers/examination/examination');

describe('routes/examination', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/examination');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
  });
});
