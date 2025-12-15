const { getMapAccessToken } = require('./_utils/get-map-token');
const logger = require('../../lib/logger');

const view = 'projects-map/view.njk';

const getProjectsMapController = async (req, res, next) => {
	try {
		const mapAccessToken = await getMapAccessToken();

		if (!mapAccessToken) {
			throw new Error('Map access token could not be retrieved');
		}

		return res.render(view, {
			mapAccessToken
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
