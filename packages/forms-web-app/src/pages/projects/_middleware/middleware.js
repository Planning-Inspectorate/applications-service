const { getApplicationData } = require('../_utils/get-application-data');
const { getVerticalTabs } = require('./_utils/get-vertical-tabs');
const logger = require('../../../lib/logger');
const {
	projectInfoProjectStages,
	materialChangeProjectStages
} = require('../../../utils/project-stages');
const {
	hasRepresentationsAvailable
} = require('../representations/index/_utils/has-representations-available');
const { getShowExaminationLink } = require('./_utils/get-show-examination-link');

async function projectsMiddleware(req, res, next) {
	try {
		const { params, baseUrl, path, session } = req;
		const { case_ref } = params;
		const { i18n } = req;

		const applicationData = await getApplicationData(case_ref, i18n.language);

		const showExaminationLink = await getShowExaminationLink(path, session, case_ref);
		const showRepresentationsLink = hasRepresentationsAvailable(
			applicationData.DateRRepAppearOnWebsite
		);

		res.locals.projectName = applicationData.projectName;
		res.locals.caseRef = case_ref;
		res.locals.applicationData = applicationData;
		res.locals.baseUrl = baseUrl;
		res.locals.path = path;
		res.locals.projectStages = applicationData.isMaterialChange
			? materialChangeProjectStages
			: projectInfoProjectStages;
		res.locals.verticalTabs = getVerticalTabs(
			i18n,
			case_ref,
			applicationData,
			showExaminationLink,
			showRepresentationsLink
		);
		next();
	} catch (e) {
		logger.error(e);
		next(e);
	}
}

module.exports = {
	projectsMiddleware
};
