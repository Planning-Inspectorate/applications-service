const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getProjectUpdates } = require('../documents/utils/get-project-updates-data');

const view = 'projects/project-information/view.njk';

const getProjectOverview = async (req, res, next) => {
	try {
		const {
			locals: { applicationData }
		} = res;
		const { caseRef } = applicationData;

		const latestUpdates = await getProjectUpdates(caseRef);

		return res.render(view, getPageData(applicationData, latestUpdates));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectOverview
};
