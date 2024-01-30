const { getApplicationData } = require('../_utils/get-application-data');
const { getVerticalTabs } = require('./_utils/get-vertical-tabs');
const logger = require('../../../lib/logger');
const { getHasTimetables } = require('../../../utils/timetables/get-timetables-state');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const config = require('../../../config');

async function projectsMiddleware(req, res, next) {
	try {
		const { params, baseUrl, path, session } = req;
		const { case_ref } = params;

		const applicationData = await getApplicationData(case_ref);
		const hasTimetables = await getHasTimetables(session, case_ref);

		res.locals.projectName = applicationData.projectName;
		res.locals.caseRef = case_ref;
		res.locals.applicationData = applicationData;
		res.locals.baseUrl = baseUrl;
		res.locals.path = path;
		res.locals.projectStages = projectInfoProjectStages;
		res.locals.verticalTabs = getVerticalTabs(case_ref, applicationData, hasTimetables);
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
