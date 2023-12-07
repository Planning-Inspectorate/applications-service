const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { getPageData } = require('./utils/get-page-data');
const {
	getRegisterOfApplicationsQueryString
} = require('./utils/get-register-of-applications-query-string');

const view = 'register-of-applications/view.njk';

const getRegisterOfApplicationsController = async (req, res, next) => {
	try {
		const { query } = req;

		const { applications, pagination } = await getApplications(
			getRegisterOfApplicationsQueryString(query)
		);

		res.render(view, getPageData(applications, query, pagination));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getRegisterOfApplicationsController
};
