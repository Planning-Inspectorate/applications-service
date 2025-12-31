const logger = require('../../lib/logger');
const { getAllProjectList } = require('../../lib/application-api-wrapper');
const { transformProjectsToGeoJSON } = require('../../services/projects-map.service');

const getProjectsMap = async (req, res, next) => {
	try {
		logger.info('Fetching projects for map API');

		const response = await getAllProjectList();

		if (!response || !response.data) {
			logger.warn('No projects found in response');
			return res.json({ type: 'FeatureCollection', features: [] });
		}

		const applications = response.data.applications || response.data;
		if (!Array.isArray(applications)) {
			logger.warn('Applications is not an array:', typeof applications);
			return res.json({ type: 'FeatureCollection', features: [] });
		}

		// Use shared transformation service
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
