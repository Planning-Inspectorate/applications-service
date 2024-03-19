const logger = require('../../lib/logger');
const { getPageData } = require('./_utils/get-page-data');

const view = 'terms-and-conditions/view.njk';

const getTermsAndConditionsController = (req, res, next) => {
	try {
		return res.render(view, getPageData());
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getTermsAndConditionsController };
