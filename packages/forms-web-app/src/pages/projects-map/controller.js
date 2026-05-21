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

/**
 * GET /projects-map
 * Renders the interactive map view with filtered project markers.
 * Fetches applications and map token in parallel, builds GeoJSON for map rendering.
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		// Redirect to clean URL if only searchTerm with no value exists
		const { searchTerm, ...filters } = query;
		if (Object.keys(filters).length === 0 && !searchTerm && req.url.includes('?')) {
			return res.redirect('/projects-map');
		}

		// Fetch applications and OS Maps token concurrently.
		// getApplications() calls GET /api/v1/applications (list endpoint) which returns
		// applications in NI legacy PascalCase shape: { CaseReference, LongLat, ProjectName, Stage, ... }.
		// This is different from GET /api/v1/applications/:caseRef (single endpoint) which
		// returns camelCase: { caseReference, longLat, projectName, ... }.
		// toGeoJSON() reads app.LongLat (PascalCase) accordingly.
		const [{ applications, filters: availableFilters }, mapAccessToken] = await Promise.all([
			getApplications(getProjectSearchQueryString(query)),
			getMapAccessToken()
		]);

		// Build query string from filters
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

/**
 * POST /projects-map
 * Toggles filter panel visibility and redirects back with preserved query params.
 * Reads current state from filterToggleValue, flips it, stores in session.
 * Extracts query string from referrer to maintain active filters.
 */
const postProjectsMapController = (req, res, next) => {
	try {
		// Flip the boolean: 'true' → false, anything else → true
		req.session.projectsMapShowFilters = req.body.filterToggleValue !== 'true';

		// Extract referrer  URL from request
		const referrer = req.get('Referrer');

		// Preserve filter query only when the referrer is the projects-map page.
		// Handles absolute and relative referrers; malformed values are ignored.
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
