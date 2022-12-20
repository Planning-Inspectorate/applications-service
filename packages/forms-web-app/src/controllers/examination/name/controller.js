const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { setDeadlineDetailsName, getDeadlineDetailsNameOrDefault } = require('../session/deadline');
const { getRedirectUrl } = require('./utils/get-redirect-url');

const getName = async (req, res) => {
	try {
		const { session, query } = req;

		const pageData = getPageData(session, query);

		pageData.name = getDeadlineDetailsNameOrDefault(session);
		return res.render(pageData.view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postName = async (req, res) => {
	try {
		const { body, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		const pageData = getPageData(session, query);

		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			return res.render(pageData.view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		const setName = body[pageData.id];

		if (!setName) throw new Error('No name in form');
		setDeadlineDetailsName(session, setName);

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
