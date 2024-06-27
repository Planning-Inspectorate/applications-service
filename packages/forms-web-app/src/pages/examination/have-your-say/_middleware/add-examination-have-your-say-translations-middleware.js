const { getTranslations } = require('../../../_utils/get-translations');
const enTranslation = require('../_translations/en.json');
const cyTranslation = require('../_translations/cy.json');
const { examinationHaveYourSayI18nNamespace } = require('../config');

const addExaminationHaveYourSayTranslationsMiddleware = (req, res, next) => {
	const { i18n } = req;
	const { language } = i18n;

	const translations = getTranslations(enTranslation, cyTranslation);

	i18n.addResourceBundle(language, examinationHaveYourSayI18nNamespace, translations[language]);

	next();
};

module.exports = { addExaminationHaveYourSayTranslationsMiddleware };
