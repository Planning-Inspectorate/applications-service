const { getMapAccessToken } = require('./_utils/get-map-token');
const logger = require('../../lib/logger');

const renderProjectsMap = async (req, res, next, isFullscreen = false) => {
	try {
		const mapAccessToken = await getMapAccessToken();

		if (!mapAccessToken) {
			throw new Error('Map access token could not be retrieved');
		}

		return res.render('projects-map/view.njk', {
			mapAccessToken,
			isFullscreen
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const getProjectsMapController = (req, res, next) => renderProjectsMap(req, res, next, false);
const getProjectsMapFullscreenController = (req, res, next) =>
	renderProjectsMap(req, res, next, true);

module.exports = {
	getProjectsMapController,
	getProjectsMapFullscreenController
};
