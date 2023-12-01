const logger = require('../../lib/logger');
const { getPageData } = require('./_utils/get-page-data');

const view = 'contact/view.njk';

const getContactController = (req, res, next) => {
	try {
		return res.render(view, getPageData());
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getContactController };
