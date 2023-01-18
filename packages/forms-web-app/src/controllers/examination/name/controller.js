const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { setDeadlineDetailsName, getDeadlineDetailsNameOrDefault } = require('../session/deadline');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { sanitiseFormPostResponse } = require('../../../utils/sanitise-form-post.js');

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
		const { errors = {}, errorSummary = [], origin } = body;
		const originIsSanitiseFormPost = origin === 'sanitise-form-post';

		const pageData = getPageData(session, query);

		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			if (originIsSanitiseFormPost) {
				return res.send(new sanitiseFormPostResponse(true, pageData.url));
			}

			return res.render(pageData.view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		const name = body[pageData.id];

		if (!name) throw new Error('No name in form');
		setDeadlineDetailsName(session, name);

		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(false, getRedirectUrl(query)));
		}

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
