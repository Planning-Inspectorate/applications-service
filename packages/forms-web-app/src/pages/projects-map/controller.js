const { getMapAccessToken } = require('./_utils/get-map-token');
const logger = require('../../lib/logger');
const { maps } = require('../../config');

/**
 * Renders the projects map page
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getProjectsMapController = async (req, res, next) => {
	try {
		const mapAccessToken = await getMapAccessToken();

		if (!mapAccessToken) {
			throw new Error('Map access token could not be retrieved');
		}

		return res.render('projects-map/view.njk', {
			mapAccessToken,
			boundariesUrl: maps.geojsonURL ? '/api/geojson/boundaries' : ''
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
