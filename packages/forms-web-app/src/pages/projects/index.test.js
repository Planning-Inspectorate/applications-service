const { get } = require('../../../__tests__/unit/routes/router-mock');
const representationsController = require('./relevant-representations/representations');
const timetableController = require('./examination-timetable/controller');
const config = require('../../config');

config.featureFlag.hideProjectTimelineLink = false;
config.featureFlag.allowDocumentLibrary = false;
config.featureFlag.allowExaminationTimetable = false;
config.featureFlag.allowRepresentation = false;
config.featureFlag.usePrivateBetaV1RoutesOnly = false;

const {
	featureFlag: { allowRepresentation, allowExaminationTimetable }
} = config;

describe('routes/examination', () => {
	beforeEach(() => {
		// eslint-disable-next-line global-require
		require('./projects.router');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should define the expected routes', () => {
		if (allowRepresentation === true) {
			expect(get).toHaveBeenCalledWith(
				'/:case_ref/representations',
				representationsController.getRepresentations
			);
		}

		if (allowExaminationTimetable === true) {
			expect(get).toHaveBeenCalledWith(
				'/:case_ref/examination-timetable',
				timetableController.getExaminationTimetable
			);
		}
	});
});
