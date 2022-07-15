const { get } = require('../router-mock');
const representationsController = require('../../../../src/controllers/projects/representations');
const projectTimelineController = require('../../../../src/controllers/projects/project-timeline');
const timetableController = require('../../../../src/controllers/projects/timetable');
const recommendationsController = require('../../../../src/controllers/projects/recommendations');
const allExaminationDocumentsController = require('../../../../src/controllers/projects/all-examination-documents');
const config = require('../../../../src/config');

config.featureFlag.hideProjectTimelineLink = false;

const {
	featureFlag: { hideProjectTimelineLink }
} = config;

describe('routes/examination', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('../../../../src/routes/projects');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		const mockCallsLength = hideProjectTimelineLink ? 9 : 8;

		expect(get).toHaveBeenCalledWith(
			'/:case_ref/representations',
			representationsController.getRepresentations
		);

		if (hideProjectTimelineLink === true) {
			expect(get).toHaveBeenCalledWith(
				'/project-timeline',
				projectTimelineController.getProjectTimeLine
			);
		}
		expect(get).toHaveBeenCalledWith(
			'/recommendations',
			recommendationsController.getRecommendations
		);
		expect(get).toHaveBeenCalledWith(
			'/all-examination-documents',
			allExaminationDocumentsController.getAllExaminationDocuments
		);
		expect(get).toHaveBeenCalledWith('/timetable', timetableController.getTimetable);
		expect(get.mock.calls.length).toBe(mockCallsLength);
	});
});
