const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { getMapAccessToken } = require('../_services');
const { getFilters } = require('../_utils/filters/get-filters');
const { GeoJSONBuilder } = require('../_utils/geo-json-builder');
const { projectsMapI18nNamespace } = require('./config');
const {
	getProjectSearchQueryString
} = require('../project-search/utils/get-project-search-query-string');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { getRelatedContentLinks } = require('../project-search/utils/get-related-content-links');
const { getProjectsMapURL } = require('./utils/get-projects-map-url');
const { queryStringBuilder } = require('../../utils/query-string-builder');

const view = 'projects-map/view.njk';

/** GET /projects-map — renders the map with filtered project markers. */
const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		// Redirect to clean URL if only searchTerm with no value exists
		const { searchTerm, ...filters } = query;
		if (Object.keys(filters).length === 0 && !searchTerm && req.url.includes('?')) {
			return res.redirect('/projects-map');
		}

		// Fetch applications and OS Maps token concurrently.
		const [{ applications, filters: availableFilters }, mapAccessToken] = await Promise.all([
			getApplications(getProjectSearchQueryString(query)),
			getMapAccessToken()
		]);

		// Build query string
		const queryParams = searchTerm ? { ...filters, searchTerm } : filters;
		const queryString = queryStringBuilder(queryParams, Object.keys(queryParams), true);

		const applicationsWithGeoJSON = (applications || []).map((application) => {
			if (application?.geojson) return application;
			application.geojson = new GeoJSONBuilder().addApplications([application]).build();
			return application;
		});

		const geoJSON = {
			type: 'FeatureCollection',
			features: applicationsWithGeoJSON.flatMap((application) =>
				Array.isArray(application?.geojson?.features) ? application.geojson.features : []
			)
		};
		res.render(view, {
			...getFilters(i18n, query, availableFilters, projectsMapI18nNamespace, getProjectsMapURL()),
			mapAccessToken,
			mapGeoJSON: JSON.stringify(geoJSON),
			projectSearchURL: getProjectSearchURL(),
			relatedContentLinks: getRelatedContentLinks(i18n, 'projectsMap'),
			query,
			queryString,
			showFilters: !!req.session.projectsMapShowFilters
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

/** POST /projects-map — toggles filter panel visibility and redirects back. */
const postProjectsMapController = (req, res, next) => {
	try {
		req.session.projectsMapShowFilters = req.body.filterToggleValue !== 'true';

		const referrer = req.get('Referrer');
		let queryString = '';
		if (referrer) {
			try {
				const referrerUrl = new URL(referrer, 'http://localhost');
				if (referrerUrl.pathname === '/projects-map') {
					queryString = referrerUrl.search.slice(1);
				}
			} catch {
				queryString = '';
			}
		}

		res.redirect(`/projects-map${queryString ? `?${queryString}` : ''}`);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getProjectsMapController, postProjectsMapController };
