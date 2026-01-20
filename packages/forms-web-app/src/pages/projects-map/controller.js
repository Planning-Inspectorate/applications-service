const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');
const { maps: mapConfig } = require('../../config');
const { getPageData } = require('./utils/get-page-data');
const { getProjectsMapQueryString } = require('./utils/get-projects-map-query-string');
const { getProjectsMapURL } = require('./utils/get-projects-map-url');

const view = 'projects-map/view.njk';

/**
 * GET /projects-map
 * Renders the projects map page with:
 * - Available filters from the API
 * - Filtered GeoJSON markers based on query parameters
 * - Leaflet configuration
 *
 * @async
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		// Fetch filters and pagination metadata (similar to project-search)
		// Uses same query string builder to get filtered counts
		const { filters } = await getApplications(getProjectsMapQueryString(query));

		// Fetch map GeoJSON data with same filters applied
		const geojson = await getProjectsMapGeoJSON(getProjectsMapQueryString(query));

		// Build page data with filters and active filter state
		const pageData = getPageData(i18n, query, geojson.features, filters);

		// Detect if any filters are active by checking query parameters
		// Filter params are any query params that represent actual filters
		const filterParams = Object.keys(query).filter(
			(key) => !['search', 'pageNumber'].includes(key)
		);
		const hasActiveFilters = filterParams.length > 0;

		// Leaflet map viewport configuration (zoom, center, bounds)
		const mapOptions = {
			minZoom: mapConfig.leafletOptions.minZoom,
			maxZoom: mapConfig.leafletOptions.maxZoom,
			center: mapConfig.leafletOptions.center,
			zoom: mapConfig.leafletOptions.zoom,
			attributionControl: mapConfig.leafletOptions.attributionControl,
			maxBounds: mapConfig.leafletOptions.maxBounds
		};

		// Configuration passed to client for map initialization
		// Key distinction for auto-zoom functionality (Scenario 7):
		// - hasActiveFilters: Boolean flag indicating if user has applied any filters
		//   Used to determine if map should auto-zoom to filtered results
		// - animateWhenZoomed: Controls animation during zoom transition
		const renderedMapConfig = {
			elementId: mapConfig.display.elementId,
			mapOptions,
			tileLayer: {
				url: mapConfig.tileLayer.url,
				tokenEndpoint: mapConfig.tileLayer.tokenEndpoint,
				options: {
					maxZoom: mapConfig.tileLayer.maxZoom,
					attribution: mapConfig.tileLayer.attribution
				}
			},
			crs: mapConfig.crs,
			markers: geojson.features,
			clustered: mapConfig.display.clustered,
			totalProjects: geojson.features.length,
			hasActiveFilters,
			animateWhenZoomed: mapConfig.display.animateWhenZoomed !== false
		};

		res.render(view, {
			...pageData,
			mapConfig: renderedMapConfig
		});
	} catch (error) {
		logger.error('Error in getProjectsMapController:', error);
		next(error);
	}
};

/**
 * POST /projects-map
 * Handles filter form submission
 *
 * Builds query string from form submission and redirects to GET with filters applied
 *
 * @async
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
const postProjectsMapController = async (req, res) => {
	try {
		const { body } = req;

		const queryParamsToKeep = Object.keys(body);
		const queryString = queryStringBuilder(body, queryParamsToKeep);
		const projectsMapURL = getProjectsMapURL();

		return res.redirect(`${projectsMapURL}${queryString}`);
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getProjectsMapController,
	postProjectsMapController
};
