const logger = require('../../../../lib/logger');
const { createUpdatesPageUrl } = require('../utils/url-mapper');
const view = 'projects/project-updates/project-updates-email/index.njk';

const getProjectUpdatesEmail = async (req, res, next) => {
	try {
		const {
			locals: { caseRef }
		} = res;

		return res.render(view, {
			pageTitle: `What is your email address?`,
			privacyNoticeUrl: 'https://www.gov.uk/help/privacy-notice',
			backLinkUrl: createUpdatesPageUrl(caseRef, 'start')
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

const postProjectUpdatesEmail = async (req, res, next) => {
	try {
		const {
			locals: { caseRef }
		} = res;
		const { body, session } = req;
		const { errors, errorSummary } = body;

		if (errors) {
			return res.render(view, {
				errors,
				errorSummary,
				pageTitle: `What is your email address?`,
				privacyNoticeUrl: 'https://www.gov.uk/help/privacy-notice',
				backLinkUrl: createUpdatesPageUrl(caseRef, 'start')
			});
		}

		session.projectUpdates = session.projectUpdates || {};
		session.projectUpdates.email = body.email;

		return res.redirect(createUpdatesPageUrl(caseRef, 'how-often'));
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = {
	getProjectUpdatesEmail,
	postProjectUpdatesEmail
};
