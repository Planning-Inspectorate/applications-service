const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { queryStringBuilder } = require('../../utils/query-string-builder');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');
const { maps: mapConfig } = require('../../config');
const { getMapAccessToken } = require('../_services');
const { getPageData } = require('./utils/get-page-data');
const { getProjectsMapQueryString } = require('./utils/get-projects-map-query-string');
const { getProjectsMapURL } = require('./utils/get-projects-map-url');

const view = 'projects-map/view.njk';

/**
 * GET /projects-map
 * Renders the projects map page with:
 * - Available filters from the API
 * - Filtered GeoJSON markers based on query parameters
 * - OpenLayers configuration
 *
 * @async
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const { i18n, query } = req;

		// Validate required map configuration
		if (!mapConfig.display || !mapConfig.display.elementId) {
			throw new Error('Missing required map configuration: display.elementId');
		}
		if (!mapConfig.crs) {
			throw new Error('Missing required map configuration: crs');
		}

		// Fetch filters and pagination metadata (similar to project-search)
		// Uses same query string builder to get filtered counts
		const { filters } = await getApplications(getProjectsMapQueryString(query));

		// Fetch map GeoJSON data with same filters applied
		const geojson = await getProjectsMapGeoJSON(getProjectsMapQueryString(query));

		// Build page data with filters and active filter state
		const pageData = getPageData(i18n, query, geojson.features, filters);

		// Fetch map access token
		const accessToken = await getMapAccessToken();

		// Configuration passed to client for OpenLayers map initialization
		const renderedMapConfig = {
			elementId: mapConfig.display.elementId,
			accessToken: accessToken,
			center: mapConfig.display.center,
			zoom: mapConfig.display.zoom,
			markers: geojson.features,
			totalProjects: geojson.features.length,
			crs: mapConfig.crs
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
