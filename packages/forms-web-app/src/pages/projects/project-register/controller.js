const logger = require('../../../lib/logger');
const { getApplications } = require('../../../services/applications.service');
const { getPageData } = require('./utils/get-page-data');
const {
	getApplicationsRegisterQueryString
} = require('./utils/get-applications-register-query-string');

const view = 'projects/project-register/view.njk';

const getProjectRegister = async (req, res, next) => {
	try {
		const { query } = req;

		const { applications, pagination } = await getApplications(
			getApplicationsRegisterQueryString(query)
		);

		res.render(view, getPageData(applications, query, pagination));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectRegister
};
