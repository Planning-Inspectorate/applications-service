const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { getPageData } = require('./utils/get-page-data');
const { getProjectSearchQueryString } = require('./utils/get-project-search-query-string');
const { getProjectSearchURL } = require('./utils/get-project-search-url');
const { getProjectsMapURL } = require('../projects-map/utils/get-projects-map-url');

const view = 'project-search/view.njk';

const getProjectSearchController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		const { applications, filters, pagination } = await getApplications(
			getProjectSearchQueryString(query)
		);

		const pageData = getPageData(i18n, query, applications, filters, pagination);
		pageData.projectsMapURL = getProjectsMapURL();

		res.render(view, pageData);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postProjectSearchController = async (req, res) => {
	try {
		const { body } = req;

		const queryParamsToKeep = Object.keys(body);
		const queryString = queryStringBuilder(body, queryParamsToKeep);
		const projectSearchURL = getProjectSearchURL();

		return res.redirect(`${projectSearchURL}${queryString}`);
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getProjectSearchController,
	postProjectSearchController
};
