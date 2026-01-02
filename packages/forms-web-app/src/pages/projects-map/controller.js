const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { getProjectSearchURL } = require('../project-search/utils/get-project-search-url');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');

const view = 'projects-map/view.njk';
const projectSearchURL = getProjectSearchURL();

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

		// Fetch raw project data from backend API
		const projectsResponse = await getAllProjectList();

		if (!projectsResponse || !projectsResponse.data) {
			throw new Error('Failed to fetch projects from database');
		}

		const applications = projectsResponse.data.applications || projectsResponse.data;

		// Transform to GeoJSON format (validates, filters, maps data)
		const geojson = transformProjectsToGeoJSON(applications);

		logger.info(`Map page loaded with ${geojson.features.length} projects`);

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

		// Render view with complete configuration
		// Note: Token handled server-side in tile proxy, never exposed to client
		res.render(view, {
			mapConfig,
			projectSearchURL
		});
	} catch (error) {
		logger.error('Error in getProjectsMapController:', error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
