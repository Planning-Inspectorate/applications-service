const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { setDeadlineDetailsSubmittingFor } = require('../session/deadline/details/submitting-for');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../routes/config');

const getSubmittingFor = (req, res) => {
	try {
		const { query, session } = req;
		res.render(submittingFor.view, getPageData(query, session));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postSubmittingFor = (req, res) => {
	try {
		const { body, query, session = {} } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[submittingFor.id] || Object.keys(errors).length > 0) {
			res.render(submittingFor.view, {
				...getPageData(query, session),
				errors,
				errorSummary
			});

			return;
		}

		const selectedSubmittingForValue = body[submittingFor.id];
		const redirectUrl = getRedirectUrl(query, selectedSubmittingForValue);
		setDeadlineDetailsSubmittingFor(session, selectedSubmittingForValue);

		res.redirect(redirectUrl);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmittingFor,
	postSubmittingFor
};
