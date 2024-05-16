const logger = require('../../lib/logger');

const view = 'contact/view.njk';

const getContactController = (req, res, next) => {
	try {
		return res.render(view);
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getContactController };
