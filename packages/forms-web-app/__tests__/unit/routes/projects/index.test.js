const { get } = require('../router-mock');
const representationsController = require('../../../../src/controllers/projects/representations');
const projectTimelineController = require('../../../../src/controllers/projects/project-timeline');
const recommendationsController = require('../../../../src/controllers/projects/recommendations');
const allExaminationDocumentsController = require('../../../../src/controllers/projects/all-examination-documents');
const config = require('../../../../src/config');
const projectSearchController = require("../../../../src/controllers/project-search");
const examinationTimetable = require("../../../../src/controllers/projects/examination-timetable");

config.featureFlag.showProjectTimelineLink = false;
config.featureFlag.allowDocumentLibrary = false;
config.featureFlag.allowRepresentation = false;
config.featureFlag.usePrivateBetaV1RoutesOnly = false;
config.featureFlag.allowDocumentLibrary = false;

const {
	featureFlag: {
		showProjectTimelineLink,
		allowRepresentation,
		usePrivateBetaV1RoutesOnly,
		allowDocumentLibrary
	}
} = config;

jest.mock("../../../../src/utils/async-route")
const asyncRouteMock = require("../../../../src/utils/async-route").asyncRoute;

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
			if (!showProjectTimelineLink) {
				totalCalls -= 1;
			}
			if (!allowRepresentation) {
				totalCalls -= 2;
			}

			if (!allowDocumentLibrary) {
				totalCalls -= 1;
			}

			return totalCalls;
		};

		if (allowRepresentation === true) {
			expect(get).toHaveBeenCalledWith(
				'/:case_ref/representations',
				representationsController.getRepresentations
			);
		}

		if (showProjectTimelineLink === true) {
			expect(get).toHaveBeenCalledWith(
				'/project-timeline',
				projectTimelineController.getProjectTimeLine
			);
		}

		if (!usePrivateBetaV1RoutesOnly) {
			expect(get).toHaveBeenCalledWith(
				'/',
				asyncRouteMock(projectSearchController.getProjectList)
			);
			expect(asyncRouteMock).toBeCalledWith(projectSearchController.getProjectList)

			expect(get).toHaveBeenCalledWith(
				'/recommendations',
				recommendationsController.getRecommendations
			);

			expect(get).toHaveBeenCalledWith(
				'/all-examination-documents',
				allExaminationDocumentsController.getAllExaminationDocuments
			);

			expect(get).toHaveBeenCalledWith(
				'/:case_ref/examination-timetable',
				asyncRouteMock(expect.any(Function))
			);
			expect(asyncRouteMock).toBeCalledWith(examinationTimetable.getExaminationTimetable)

			expect(get.mock.calls.length).toBe(mockCallsLength());
		}
	});
});
