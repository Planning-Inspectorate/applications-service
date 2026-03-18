const logger = require('../../lib/logger');
const { featureFlag } = require('../../config');
const { getApplications } = require('../../services/applications.service');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { getPageData } = require('./utils/get-page-data');
const { getProjectSearchQueryString } = require('./utils/get-project-search-query-string');
const { getProjectSearchURL } = require('./utils/get-project-search-url');
const {
	applications: { defaultItemsPerPage }
} = require('../../config');

const view = 'project-search/view.njk';

const paginateApplications = (applications, query, pagination) => {
	if (pagination.totalPages > 1) return { applications, pagination };

	const size = Number(query.itemsPerPage) || defaultItemsPerPage;
	const page = Number(query.page) || 1;
	const start = (page - 1) * size;

	return {
		applications: applications.slice(start, start + size),
		pagination: {
			...pagination,
			itemsPerPage: size,
			currentPage: page,
			totalPages: Math.ceil(Math.max(1, pagination.totalItems) / size)
		}
	};
};

const getProjectSearchController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		const {
			applications: allApplications,
			filters,
			pagination: rawPagination
		} = await getApplications(getProjectSearchQueryString(query));

		const { applications, pagination } = paginateApplications(
			allApplications,
			query,
			rawPagination
		);

		res.render(view, {
			...getPageData(i18n, query, applications, filters, pagination),
			enableProjectsMap: featureFlag.enableProjectsMap
		});
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
