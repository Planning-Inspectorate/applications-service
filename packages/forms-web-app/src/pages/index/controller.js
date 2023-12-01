const logger = require('../../lib/logger');
const { getPageData } = require('./utils/get-page-data');

const view = 'index/view.njk';

const getIndexController = async (req, res, next) => {
	try {
		return res.render(view, getPageData());
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getIndexController
};
