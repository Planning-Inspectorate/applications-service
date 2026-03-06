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

/**
 * Converts raw application records to a GeoJSON FeatureCollection for map rendering.
 * Applications without valid LongLat coordinates are silently excluded.
 */
/** Maps numeric DB Stage value to display label. Mirrors NI_MAPPING.stage in application.mapper.js. */
const STAGE_LABELS = {
	0: 'Draft',
	1: 'Pre-application',
	2: 'Acceptance',
	3: 'Pre-examination',
	4: 'Examination',
	5: 'Recommendation',
	6: 'Decision',
	7: 'Post-decision',
	8: 'Withdrawn'
};

/**
 * Converts raw application records to a GeoJSON FeatureCollection for map rendering.
 * Applications without valid LongLat coordinates are silently excluded.
 * @param {Object[]} applications
 * @returns {Object} GeoJSON FeatureCollection
 */
const toGeoJSON = (applications) => ({
	type: 'FeatureCollection',
	features: applications
		.map((app) => {
			const coords = app.LongLat;
			if (!coords || coords.length < 2 || !coords[0] || !coords[1]) return null;
			const lng = parseFloat(coords[0]);
			const lat = parseFloat(coords[1]);
			if (isNaN(lng) || isNaN(lat)) return null;
			return {
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [lng, lat] },
				properties: {
					caseReference: app.CaseReference,
					projectName: app.ProjectName,
					stage: STAGE_LABELS[app.Stage] || app.Stage,
					projectURL: `/projects/${app.CaseReference}`
				}
			};
		})
		.filter(Boolean)
});

/**
 * GET /projects-map
 * Renders the interactive map view with filtered project markers.
 * Fetches applications and map token in parallel, builds GeoJSON for map rendering.
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		// Redirect to clean URL if only _csrf or searchTerm with no value exists
		// eslint-disable-next-line no-unused-vars
		const { _csrf, searchTerm, ...filters } = query;
		if (Object.keys(filters).length === 0 && !searchTerm && req.url.includes('?')) {
			return res.redirect('/projects-map');
		}

		// Fetch applications and OS Maps token concurrently
		const [{ applications, filters: availableFilters }, mapAccessToken] = await Promise.all([
			getApplications(getProjectSearchQueryString(query)),
			getMapAccessToken()
		]);

		// Strip CSRF token from query before passing to view
		// eslint-disable-next-line no-unused-vars
		const { _csrf: _csrfIgnored, ...safeQuery } = query;

		res.render(view, {
			...getFilters(i18n, query, availableFilters, projectsMapI18nNamespace),
			mapAccessToken,
			mapGeoJSON: JSON.stringify(toGeoJSON(applications)),
			projectSearchURL: getProjectSearchURL(),
			relatedContentLinks: getRelatedContentLinks(i18n, 'projectsMap'),
			query: safeQuery,
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

		// Extract query string from referrer URL
		// e.g., '?region=wales&sector=energy' → 'region=wales&sector=energy'
		const queryString = referrer ? new URL(referrer).search.slice(1) : '';

		res.redirect(`/projects-map${queryString ? `?${queryString}` : ''}`);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getProjectsMapController, postProjectsMapController };
