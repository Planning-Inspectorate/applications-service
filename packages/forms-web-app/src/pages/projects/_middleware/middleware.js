const { getApplicationData } = require('../_utils/get-application-data');
const { getVerticalTabs } = require('./_utils/get-vertical-tabs');
const logger = require('../../../lib/logger');
const { getHasOpenTimetables } = require('../../../utils/timetables/get-timetables-state');
const {
	areEventsEligibleForDisplay
} = require('../examination-timetable/_utils/events/get-events');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const config = require('../../../config');

async function projectsMiddleware(req, res, next) {
	try {
		const { params, baseUrl, path } = req;
		const { case_ref } = params;
		const applicationData = await getApplicationData(case_ref);
		const hasOpenTimetables = await getHasOpenTimetables(case_ref);
		const eventsEligibleForDisplay = areEventsEligibleForDisplay(
			applicationData.dateOfNonAcceptance
		);

		res.locals.projectName = applicationData.projectName;
		res.locals.caseRef = case_ref;
		res.locals.applicationData = applicationData;
		res.locals.baseUrl = baseUrl;
		res.locals.path = path;
		res.locals.projectStages = projectInfoProjectStages;
		res.locals.hasOpenTimetables = hasOpenTimetables;
		res.locals.verticalTabs = getVerticalTabs(
			case_ref,
			hasOpenTimetables,
			eventsEligibleForDisplay,
			applicationData
		);
		next();
	} catch (e) {
		logger.error(e);
		next(e);
	}
}

const projectMigrationMiddleware = (req, res, next) => {
	if (config.featureFlag.projectMigrationCaseReferences.includes(req.params.case_ref)) {
		next();
	} else {
		res.status(404).render('error/not-found');
	}
};

module.exports = {
	projectsMiddleware,
	projectMigrationMiddleware
};
