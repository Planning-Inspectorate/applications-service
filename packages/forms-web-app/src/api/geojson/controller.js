const fetch = require('node-fetch');
const logger = require('../../lib/logger');
const { maps: mapsConfig } = require('../../config');

const getGeoJsonController = async (req, res, next) => {
	try {
		if (!mapsConfig.geojsonURL) {
			logger.warn('GEOJSON_URL not configured');
			return res.status(404).json({ error: 'GeoJSON endpoint not configured' });
		}

		const startTime = Date.now();
		const response = await fetch(mapsConfig.geojsonURL);
		const fetchTime = Date.now() - startTime;

		if (!response.ok) {
			throw new Error(`Failed to fetch geojson data: ${response.status} ${response.statusText}`);
		}

		logger.info(`Fetched geojson data in ${fetchTime}ms`);

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'public, max-age=3600');
		return response.body.pipe(res);
	} catch (error) {
		logger.error({ error }, 'Error fetching GeoJSON data');
		next(error);
	}
};

module.exports = { getGeoJsonController };
