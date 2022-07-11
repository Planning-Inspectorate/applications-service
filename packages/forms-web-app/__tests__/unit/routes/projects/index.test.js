const { get } = require('../router-mock');
const {
	getProjectRepresentations
} = require('../../../../src/controllers/projects/project/representations');
const { getProjectTimeLine } = require('../../../../src/controllers/projects/project/timeline');
const { getProjectTimetable } = require('../../../../src/controllers/projects/project/timetable');
const {
	getProjectRecommendations
} = require('../../../../src/controllers/projects/project/recommendations');
const {
	getProjectExaminationDocuments
} = require('../../../../src/controllers/projects/project/examination-documents');

describe('routes/examination', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../src/routes/projects');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		expect(get).toHaveBeenCalledWith('/:case_ref/representations', getProjectRepresentations);
		expect(get).toHaveBeenCalledWith('/project-timeline', getProjectTimeLine);
		expect(get).toHaveBeenCalledWith('/recommendations', getProjectRecommendations);
		expect(get).toHaveBeenCalledWith('/all-examination-documents', getProjectExaminationDocuments);
		expect(get).toHaveBeenCalledWith('/timetable', getProjectTimetable);
		expect(get.mock.calls.length).toBe(9);
	});
});
