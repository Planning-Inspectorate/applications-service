const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');

const view = 'examination/check-your-answers/view.njk';

const getCheckYourAnswers = (req, res) => {
	try {
		const { i18n, session } = req;
		res.render(view, getPageData(i18n, session));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getCheckYourAnswers
};
