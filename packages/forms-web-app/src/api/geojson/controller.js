const fetch = require('node-fetch');
const logger = require('../../lib/logger');
const { maps: mapsConfig } = require('../../config');

const getMasterGeojson = async (req, res, next) => {
	try {
		const startTime = Date.now();
		const response = await fetch(mapsConfig.geojsonURL);
		const fetchTime = Date.now() - startTime;

		if (!response.ok) {
			throw new Error(`Failed to fetch geojson data: ${response.status} ${response.statusText}`);
		}

		logger.info(`Fetched master_geojson.json in ${fetchTime}ms`);

		res.setHeader('Content-Type', 'application/json');
		return response.body.pipe(res);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getMasterGeojson };
