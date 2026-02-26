const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { getMapAccessToken } = require('../_services');
const { getFilters } = require('../_utils/filters/get-filters');
const { projectsMapI18nNamespace } = require('./config');
const {
	getProjectSearchQueryString
} = require('../project-search/utils/get-project-search-query-string');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { getRelatedContentLinks } = require('../project-search/utils/get-related-content-links');

const view = 'projects-map/view.njk';

const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		const [{ filters }, mapAccessToken] = await Promise.all([
			getApplications(getProjectSearchQueryString(query)),
			getMapAccessToken()
		]);

		res.render(view, {
			...getFilters(i18n, query, filters, projectsMapI18nNamespace),
			mapAccessToken,
			projectSearchURL: getProjectSearchURL(),
			relatedContentLinks: getRelatedContentLinks(i18n),
			query
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getProjectsMapController };
