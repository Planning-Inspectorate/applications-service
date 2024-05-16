const logger = require('../../lib/logger');
const { getPageData } = require('./_utils/get-page-data');

const view = 'accessibility-statement/view.njk';

const getAccessibilityStatementController = (req, res, next) => {
	try {
		const refUrl = req.get('Referrer');
		res.render(view, getPageData(refUrl));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getAccessibilityStatementController };
