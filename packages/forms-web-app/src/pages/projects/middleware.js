const { getApplicationData } = require('./documents/utils/get-application-data');
const { getVerticalTabs } = require('./utils/get-vertical-tabs');

async function verticalTabs(req, res, next) {
	const { params } = req;
	const { case_ref } = params;
	const { projectName } = await getApplicationData(case_ref);
	res.locals.projectName = projectName;
	res.locals.caseRef = case_ref;
	res.locals.verticalTabs = getVerticalTabs(projectName, case_ref);
	next();
}

module.exports = {
	verticalTabs
};
