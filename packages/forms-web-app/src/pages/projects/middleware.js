const { getApplicationData } = require('./documents/utils/get-application-data');
const { getVerticalTabs } = require('./utils/get-vertical-tabs');
const logger = require('../../lib/logger');

async function middleware(req, res, next) {
	try {
		const { params, baseUrl, path } = req;
		const { case_ref } = params;
		const { projectName } = await getApplicationData(case_ref);
		res.locals.projectName = projectName;
		res.locals.caseRef = case_ref;
		res.locals.baseUrl = baseUrl;
		res.locals.path = path;
		res.locals.verticalTabs = getVerticalTabs(projectName, case_ref);
		next();
	} catch (e) {
		logger.error(e);
		next(e);
	}
}

module.exports = {
	middleware
};
