const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { personalInformationWhich, checkDeadlineItem }
		}
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');
const { getPageData } = require('../personal-information-which/utils/getPageData');
const {
	savePersonalInformationFlags,
	clearAllPersonalInformationFlags
} = require('./utils/savePersonalInformationFlags');

const getPersonalInformationWhich = (req, res) => {
	try {
		const { session } = req;

		const pageData = getPageData(session);

		return res.render(personalInformationWhich.view, {
			...pageData
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postPersonalInformationWhich = (req, res) => {
	try {
		const { session, body } = req;
		const { errors = {}, errorSummary = [] } = body;

		clearAllPersonalInformationFlags(session);
		const pageData = getPageData(session);

		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			return res.render(personalInformationWhich.view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		savePersonalInformationFlags(session, body[pageData.id]);
		return res.redirect(`${examinationDirectory}${checkDeadlineItem.route}`);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getPersonalInformationWhich,
	postPersonalInformationWhich
};
