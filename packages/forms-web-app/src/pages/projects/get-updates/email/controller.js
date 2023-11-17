const logger = require('../../../../lib/logger');
const { setGetUpdatesEmailSession } = require('../_session');
const { getUpdatesHowOftenURL } = require('../how-often/utils/get-updates-how-often-url');
const { getPageData } = require('./utils/get-page-data');

const view = 'projects/get-updates/email/view.njk';

const getGetUpdatesEmail = (req, res, next) => {
	try {
		const {
			session,
			params: { case_ref: caseRef }
		} = req;

		return res.render(view, getPageData(session, caseRef));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postGetUpdatesEmail = async (req, res, next) => {
	try {
		const {
			body,
			session,
			params: { case_ref: caseRef }
		} = req;
		const { errors, errorSummary, email } = body;

		if (errors) {
			return res.render(view, {
				...getPageData(session, caseRef),
				email: errors.email.value,
				errors,
				errorSummary
			});
		}

		setGetUpdatesEmailSession(session, email);

		return res.redirect(getUpdatesHowOftenURL(caseRef));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getGetUpdatesEmail,
	postGetUpdatesEmail
};
