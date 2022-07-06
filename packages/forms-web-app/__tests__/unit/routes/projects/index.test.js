const { get } = require('../router-mock');
const representationsController = require('../../../../src/controllers/projects/representations');
const { getProjectsTimeLine } = require('../../../../src/controllers/projects/timeline');
const timetableController = require('../../../../src/controllers/projects/timetable');
const recommendationsController = require('../../../../src/controllers/projects/recommendations');
const allExaminationDocumentsController = require('../../../../src/controllers/projects/all-examination-documents');

describe('routes/examination', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../src/routes/projects');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith(
			'/:case_ref/representations',
			representationsController.getRepresentations
		);
		expect(get).toHaveBeenCalledWith('/project-timeline', getProjectsTimeLine);
		expect(get).toHaveBeenCalledWith(
			'/recommendations',
			recommendationsController.getRecommendations
		);
		expect(get).toHaveBeenCalledWith(
			'/all-examination-documents',
			allExaminationDocumentsController.getAllExaminationDocuments
		);
		expect(get).toHaveBeenCalledWith('/timetable', timetableController.getTimetable);
		expect(get.mock.calls.length).toBe(9);
	});
});
