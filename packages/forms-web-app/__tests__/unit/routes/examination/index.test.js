const { get } = require('../router-mock');
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
    expect(get.mock.calls.length).toBe(7);
  });
});
