const { get } = require('../router-mock');
const examinationController = require('../../../../src/controllers/examination/examination');
const representationsController = require('../../../../src/controllers/examination/representations');
const projectTimelineController = require('../../../../src/controllers/examination/project-timeline');

describe('routes/examination', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/examination');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/representations',
      representationsController.getRepresentations
    );
    expect(get).toHaveBeenCalledWith(
      '/project-timeline',
      projectTimelineController.getProjectTimeLine
    );
    expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
  });
});
