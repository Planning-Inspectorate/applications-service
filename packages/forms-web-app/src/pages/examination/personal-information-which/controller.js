const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/getPageData');
const {
	savePersonalInformationFlags,
	clearAllPersonalInformationFlags
} = require('./utils/savePersonalInformationFlags');
const {
	routesConfig: {
		examination: {
			pages: { checkSubmissionItem }
		}
	}
} = require('../../../routes/config');

const view = 'examination/personal-information-which/view.njk';

const getPersonalInformationWhich = (req, res) => {
	try {
		const { i18n, session } = req;

		const pageData = getPageData(i18n, session);

		return res.render(view, {
			...pageData
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postPersonalInformationWhich = (req, res) => {
	try {
		const { i18n, session, body } = req;
		const { errors = {}, errorSummary = [] } = body;

		clearAllPersonalInformationFlags(session);
		const pageData = getPageData(i18n, session);

		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		savePersonalInformationFlags(session, body[pageData.id]);
		return res.redirect(`${checkSubmissionItem.route}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getPersonalInformationWhich,
	postPersonalInformationWhich
};
