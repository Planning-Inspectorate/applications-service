const logger = require('../../../lib/logger');
const { addKeyValueToActiveSubmissionItem } = require('../_session/submission-items-session');
const { getPageData } = require('./utils/page-data');

const {
	routesConfig: {
		examination: {
			pages: { personalInformation }
		}
	}
} = require('../../../routes/config');

const { getRedirectUrl } = require('./utils/get-redirect-url');
const {
	clearAllPersonalInformationFlags
} = require('../personal-information-which/utils/savePersonalInformationFlags');

const view = 'examination/personal-information/view.njk';

const getPersonalInformation = (req, res) => {
	try {
		const { i18n, session } = req;
		return res.render(view, getPageData(i18n, session));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postPersonalInformation = (req, res) => {
	try {
		const { body, i18n, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		const setPageData = getPageData(i18n, session);

		if (errors[personalInformation.id] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...setPageData,
				errors,
				errorSummary
			});
		}

		const personalInformationValue = body[setPageData.id];

		addKeyValueToActiveSubmissionItem(session, 'personalInformation', personalInformationValue);

		if (personalInformationValue === 'no') clearAllPersonalInformationFlags(session);

		const redirectUrl = getRedirectUrl(session, setPageData.id, personalInformationValue);
		return res.redirect(redirectUrl);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getPersonalInformation,
	postPersonalInformation
};
