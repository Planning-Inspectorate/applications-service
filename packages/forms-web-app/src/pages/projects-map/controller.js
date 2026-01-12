const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');
const { getPageData } = require('./utils/get-page-data');
const { getProjectsMapQueryString } = require('./utils/get-projects-map-query-string');
const { getProjectsMapURL } = require('./utils/get-projects-map-url');
const { maps: mapConfig } = require('../../config');

const view = 'projects-map/view.njk';
const projectSearchURL = getProjectSearchURL();

/**
 * GET /projects-map
 * Renders projects map with server-side data fetching, filtering, and configuration
 *
 * Fetches filtered applications from the API, transforms them to GeoJSON format,
 * prepares filter view models for the UI, and renders the map view with complete
 * configuration.
 *
 * @param {Object} req - Express request
 * @param {Object} req.i18n - Internationalization object
 * @param {Object} req.query - Query parameters (filters, search term)
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		logger.info('Loading projects map page...');

		const { i18n, query } = req;

		// Fetch filtered applications based on query parameters
		const { applications, filters, pagination } = await getApplications(
			getProjectsMapQueryString(query)
		);

		// Transform to GeoJSON format (validates, filters, maps data)
		const geojson = transformProjectsToGeoJSON(applications);

		logger.info(`Map page loaded with ${geojson.features.length} projects`);

		// Build mapOptions from configuration
		const mapOptions = {
			minZoom: mapConfig.leafletOptions.minZoom,
			maxZoom: mapConfig.leafletOptions.maxZoom,
			center: mapConfig.leafletOptions.center,
			zoom: mapConfig.leafletOptions.zoom,
			attributionControl: mapConfig.leafletOptions.attributionControl
		};

		// Add bounds restriction if enabled
		if (mapConfig.restrictToUk.enabled) {
			mapOptions.maxBounds = mapConfig.restrictToUk.bounds;
			mapOptions.maxBoundsViscosity = mapConfig.restrictToUk.viscosity;
			logger.info('Map bounds restricted to UK');
		}

		// Build configuration object for client-side script
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
			markers: geojson.features,
			clustered: mapConfig.display.clustered,
			totalProjects: geojson.features.length
		};

		// Render view with complete configuration and filter data
		res.render(view, {
			...getPageData(i18n, query, applications, filters, pagination),
			mapConfig: renderedMapConfig,
			projectSearchURL
		});
	} catch (error) {
		logger.error('Error in getProjectsMapController:', error);
		next(error);
	}
};

/**
 * POST /projects-map
 * Handles filter form submission and redirects with query parameters
 *
 * Extracts filter selections from form submission and redirects to the GET
 * endpoint with query parameters. This triggers the GET handler which
 * fetches and displays filtered results.
 *
 * @param {Object} req - Express request
 * @param {Object} req.body - Form body containing filter selections
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
