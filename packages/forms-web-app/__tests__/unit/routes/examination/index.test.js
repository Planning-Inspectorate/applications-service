const { get, use } = require('../router-mock');
const aboutTheApplicationRouter = require('../../../../src/routes/examination/about-the-application');
const examinationController = require('../../../../src/controllers/examination/examination');
const representationsController = require('../../../../src/controllers/examination/representations');
const projectTimelineController = require('../../../../src/controllers/examination/project-timeline');
const timetableController = require('../../../../src/controllers/examination/timetable');

describe('routes/examination', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/examination');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(use).toHaveBeenCalledWith('/about-the-application', aboutTheApplicationRouter);

    expect(get).toHaveBeenCalledWith(
      '/representations',
      representationsController.getRepresentations
    );
    expect(get).toHaveBeenCalledWith(
      '/project-timeline',
      projectTimelineController.getProjectTimeLine
    );
    expect(get).toHaveBeenCalledWith('/timetable', timetableController.getTimetable);
    expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
  });
});
