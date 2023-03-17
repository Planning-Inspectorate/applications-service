const {
	routesConfig: {
		examination: {
			pages: { email }
		}
	}
} = require('../../../routes/config');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { getPageData } = require('./utils/get-page-data');
const {
	setDeadlineDetailsEmail,
	getDeadlineDetailsEmailOrDefault
} = require('../_session/deadline');
const logger = require('../../../lib/logger');

const view = 'examination/email/view.njk';

const getEmail = async (req, res) => {
	try {
		const { query, session } = req;

		const pageData = getPageData(session, query);
		pageData.email = getDeadlineDetailsEmailOrDefault(session);

		return res.render(view, pageData);
	} catch (e) {
		logger.error(e);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEmail = async (req, res) => {
	const { body, query, session } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[email.id] || Object.keys(errors).length > 0) {
		return res.render(view, {
			...getPageData(session, query),
			errors,
			errorSummary
		});
	}

	setDeadlineDetailsEmail(session, body[email.id]);

	return res.redirect(getRedirectUrl(query));
};

module.exports = {
	getEmail,
	postEmail
};
