const logger = require('../../../lib/logger');
const { getApplications } = require('../../../services/applications.service');
const { getPageData } = require('./utils/get-page-data');
const { getProjectSearchQueryString } = require('./utils/get-applications-register-query-string');

const view = 'projects/project-register/view.njk';

const getProjectRegister = async (req, res, next) => {
	try {
		const { query } = req;

		const applications = await getApplications(getProjectSearchQueryString(query));

		console.log('applications :>> ', applications);

		res.render(view, getPageData(applications, query));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectRegister
};
