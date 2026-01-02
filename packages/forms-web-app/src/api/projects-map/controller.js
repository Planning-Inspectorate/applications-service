/**
 * Projects Map Controller
 *
 * Handles retrieval and transformation of project data to GeoJSON format
 * for rendering on the map interface
 */

const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');

/**
 * Retrieves all projects and transforms them to GeoJSON format
 *
 * @returns {Object} GeoJSON FeatureCollection with project features
 */
const getProjectsMap = async (req, res, next) => {
	try {
		logger.info('Fetching projects for map API');

		const response = await getAllProjectList();

		if (!response || !response.data) {
			logger.warn('No projects found in response');
			return res.json({ type: 'FeatureCollection', features: [] });
		}

		const applications = response.data.applications;

		if (!Array.isArray(applications)) {
			logger.warn('Applications is not an array:', typeof applications);
			return res.json({ type: 'FeatureCollection', features: [] });
		}

		// Transform project objects to GeoJSON format for map rendering
		// This extracts coordinates and properties needed by Leaflet
		const geojson = transformProjectsToGeoJSON(applications);

		logger.info(`Map API returning ${geojson.features.length} projects`);

		res.json(geojson);
	} catch (error) {
		logger.error('Error fetching projects for map API:', {
			error: error.message,
			stack: error.stack
		});
		next(error);
	}
};

module.exports = { getProjectsMap };
