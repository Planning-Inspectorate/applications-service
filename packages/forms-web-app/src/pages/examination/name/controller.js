const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { setDeadlineDetailsName } = require('../_session/deadline');
const { getRedirectUrl } = require('./utils/get-redirect-url');

const view = 'examination/name/view.njk';

const getName = async (req, res) => {
	try {
		const { i18n, query, session } = req;

		return res.render(view, getPageData(i18n, session, query));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postName = async (req, res) => {
	try {
		const { body, i18n, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		const pageData = getPageData(i18n, session, query);

		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...pageData,
				name: errors[pageData.id].value,
				errors,
				errorSummary
			});
		}

		const name = body[pageData.id];

		if (!name) throw new Error('No name in form');

		setDeadlineDetailsName(session, name);

		return res.redirect(getRedirectUrl(query));
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getName,
	postName
};
