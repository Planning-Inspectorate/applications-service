const logger = require('../../lib/logger');

const view = 'projects-map/view.njk';

const getProjectsMapController = async (req, res, next) => {
	try {
		res.render(view);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectsMapController
};
