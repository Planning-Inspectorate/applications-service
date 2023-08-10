const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getProjectUpdatesData } = require('../../services');

const view = 'projects/project-information/view.njk';

const getProjectInformation = async (req, res, next) => {
	try {
		const {
			locals: { applicationData }
		} = res;
		const { caseRef } = applicationData;

		const projectUpdates = await getProjectUpdatesData(caseRef);

		console.log('APPDATA :>> ', applicationData);
		return res.render(view, getPageData(applicationData, projectUpdates));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectInformation
};
