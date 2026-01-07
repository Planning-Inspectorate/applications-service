const logger = require('../../lib/logger');
const { getApplications } = require('../../services/applications.service');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');
const { getProjectsMapQueryString } = require('./utils/get-projects-map-query-string');
const { getPageData } = require('./utils/get-page-data');
const { queryStringBuilder } = require('../../utils/query-string-builder');

const view = 'projects-map/view.njk';
const projectSearchURL = getProjectSearchURL();
const projectsMapURL = '/projects-map';

/**
 * GET /projects-map
 * Renders projects map with server-side data fetching and configuration
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		logger.info('Loading projects map page...');

		const { query } = req;

		// Fetch filtered project data from backend API using getApplications service
		// This service handles region, sector, stage filtering server-side
		const response = await getApplications(getProjectsMapQueryString(query));

		if (!response || !response.applications) {
			throw new Error('Failed to fetch projects from database');
		}

		const { applications, filters, pagination } = response;

		// Transform to GeoJSON format (validates, filters, maps data)
		const geojson = transformProjectsToGeoJSON(applications);

		logger.info(
			`Map page loaded with ${geojson.features.length} projects (filtered: ${
				Object.keys(query).length > 0
			})`
		);

		// Build mapConfig object (configuration-driven pattern)
		const mapConfig = {
			elementId: 'map',
			mapOptions: {
				minZoom: 7, // OS Maps doesn't have tiles below zoom 7
				maxZoom: 20,
				center: [51.8086, -1.7139],
				zoom: 7,
				maxBounds: [
					[49.901711, -5.174561],
					[53.638125, 1.746826]
				],
				// Toggle to show/hide OS Maps copyright notice in bottom-right
				attributionControl: true
			},
			tileLayer: {
				url: '/api/map-tile/{z}/{x}/{y}', // Backend proxy handles OAuth token
				options: {
					maxZoom: 20,
					attribution: '© Crown Copyright and database right'
				}
			},
			markers: geojson.features,
			clustered: true,
			totalProjects: geojson.features.length
		};

		// Process filter data for display (Stage 4)
		// getPageData transforms raw filters into checkbox-accordion compatible format
		const pageData = getPageData(req.i18n, query, filters, pagination);

		// Render view with complete configuration
		// Note: Token handled server-side in tile proxy, never exposed to client
		res.render(view, {
			mapConfig,
			projectSearchURL,
			...pageData
		});
	} catch (error) {
		logger.error('Error in getProjectsMapController:', error);
		next(error);
	}
};

/**
 * POST /projects-map
 * Handles filter form submission and redirects to GET with query params
 *
 * @param {Object} req - Express request with filter form data in body
 * @param {Object} res - Express response
 * @returns {void} Redirects to /projects-map with query params
 */
const postProjectsMapController = async (req, res) => {
	try {
		const { body } = req;

		const queryParamsToKeep = Object.keys(body);
		const queryString = queryStringBuilder(body, queryParamsToKeep);

		return res.redirect(`${projectsMapURL}${queryString}`);
	} catch (error) {
		logger.error('Error in postProjectsMapController:', error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getProjectsMapController,
	postProjectsMapController
};
