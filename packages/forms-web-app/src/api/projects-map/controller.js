/**
 * Projects Map Controller
 *
 * Handles retrieval and transformation of project data to GeoJSON format
 * for rendering on the map interface
 */

const logger = require('../../lib/logger');
const { getProjectsMapGeoJSON } = require('../../services/projects-map.service');

/**
 * GET /api/projects-map
 * Retrieves all projects in GeoJSON format for map visualization
 *
 * @async
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {Function} next - Express error handler middleware
 * @returns {void} Sends GeoJSON FeatureCollection with HTTP 200
 * @throws {Error} Passes errors to Express error handler via next()
 *
 * Response format (HTTP 200):
 * ```json
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [longitude, latitude]
 *       },
 *       "properties": {
 *         "caseRef": "EN010001",
 *         "projectName": "High Speed Rail",
 *         "stage": "Pre-application",
 *         "summary": "...",
 *         "region": "London"
 *       }
 *     }
 *   ]
 * }
 * ```
 */
const getProjectsMap = async (req, res, next) => {
	try {
		const geojson = await getProjectsMapGeoJSON();
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
