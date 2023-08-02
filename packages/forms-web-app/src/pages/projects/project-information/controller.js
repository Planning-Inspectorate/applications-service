const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getProjectUpdates } = require('../../../lib/application-api-wrapper')

const view = 'projects/project-information/view.njk';

const getProjectOverview = async (req, res, next) => {
	const {
		locals: { applicationData }
	} = res;

	const { caseRef } = applicationData 

	try {
		const latestUpdates = await getProjectUpdates(caseRef)
		console.log('latestUpdates :>> ', latestUpdates);
		return res.render(view, getPageData(applicationData));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectOverview
};
