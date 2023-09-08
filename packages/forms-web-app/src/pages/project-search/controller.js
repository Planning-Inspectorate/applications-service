const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { getPageData } = require('./utils/get-page-data');
const { getProjectSearchQueryString } = require('./utils/get-project-search-query-string');

const view = 'project-search/view.njk';

const getProjectSearch = async (req, res, next) => {
	try {
		const { query } = req;

		const { applications, pagination } = await getApplications(getProjectSearchQueryString(query));
		console.log('pageData SEARCH:: >:', getPageData(query, applications, pagination));
		res.render(view, getPageData(query, applications, pagination));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectSearch
};
