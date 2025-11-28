const { getMapAccessToken } = require('./_utils/get-map-token');
const logger = require('../../../lib/logger');

const view = 'maps-poc/all-projects/view.njk';

const getAllProjectsMapController = async (req, res, next) => {
	try {
		const mapAccessToken = await getMapAccessToken();

		if (!mapAccessToken) {
			throw new Error('Map access token could not be retrieved');
		}

		console.dir('Token retrieved in controller:', { mapAccessToken });
		return res.render(view, {
			mapAccessToken
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getAllProjectsMapController
};
