const { get } = require('../router-mock');
const representationsController = require('../../../../src/controllers/projects/representations');
const projectTimelineController = require('../../../../src/controllers/projects/project-timeline');
const timetableController = require('../../../../src/controllers/projects/timetable');
const recommendationsController = require('../../../../src/controllers/projects/recommendations');
const allExaminationDocumentsController = require('../../../../src/controllers/projects/all-examination-documents');
const config = require('../../../../src/config');

config.featureFlag.hideProjectTimelineLink = false;
config.featureFlag.allowDocumentLibrary = false;
config.featureFlag.allowRepresentation = false;
config.featureFlag.usePrivateBetaV1RoutesOnly = false;
config.featureFlag.allowDocumentLibrary = false;

const {
	featureFlag: {
		hideProjectTimelineLink,
		allowRepresentation,
		usePrivateBetaV1RoutesOnly,
		allowDocumentLibrary
	}
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
		const mockCallsLength = () => {
			let totalCalls = 9;
			if (!hideProjectTimelineLink) {
				totalCalls -= 1;
			}
			if (!allowRepresentation) {
				totalCalls -= 2;
			}

			if (!allowDocumentLibrary) {
				totalCalls -= 2;
			}

			return totalCalls;
		};

		if (allowRepresentation === true) {
			expect(get).toHaveBeenCalledWith(
				'/:case_ref/representations',
				representationsController.getRepresentations
			);
		}

		if (hideProjectTimelineLink === true) {
			expect(get).toHaveBeenCalledWith(
				'/project-timeline',
				projectTimelineController.getProjectTimeLine
			);
		}

		if (!usePrivateBetaV1RoutesOnly) {
			expect(get).toHaveBeenCalledWith(
				'/recommendations',
				recommendationsController.getRecommendations
			);
			expect(get).toHaveBeenCalledWith(
				'/all-examination-documents',
				allExaminationDocumentsController.getAllExaminationDocuments
			);
			expect(get).toHaveBeenCalledWith('/timetable', timetableController.getTimetable);
			expect(get.mock.calls.length).toBe(mockCallsLength());
		}
	});
});
