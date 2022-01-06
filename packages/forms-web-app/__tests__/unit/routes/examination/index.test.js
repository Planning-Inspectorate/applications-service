const { get, use } = require('../router-mock');
const aboutTheApplicationRouter = require('../../../../src/routes/examination/about-the-application');
const examinationController = require('../../../../src/controllers/examination/examination');
const representationsController = require('../../../../src/controllers/examination/representations');
const projectTimelineController = require('../../../../src/controllers/examination/project-timeline');
const timetableController = require('../../../../src/controllers/examination/timetable');
const recommendationsController = require('../../../../src/controllers/examination/recommendations');
const allExaminationDocumentsController = require('../../../../src/controllers/examination/all-examination-documents');

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
    expect(get).toHaveBeenCalledWith(
      '/recommendations',
      recommendationsController.getRecommendations
    );
    expect(get).toHaveBeenCalledWith(
      '/all-examination-documents',
      allExaminationDocumentsController.getAllExaminationDocuments
    );
    expect(get).toHaveBeenCalledWith('/timetable', timetableController.getTimetable);
    expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
    expect(use.mock.calls.length).toBe(1);
    expect(get.mock.calls.length).toBe(6);
  });
});
