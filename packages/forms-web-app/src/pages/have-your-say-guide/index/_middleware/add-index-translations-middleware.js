const { getTranslations } = require('../../../_utils/get-translations');
const enTranslation = require('../_translations/en.json');
const cyTranslation = require('../_translations/cy.json');
const { haveYourSayGuideIndexI18nNamespace } = require('../config');

const addIndexTranslationsMiddleware = (req, res, next) => {
	const { i18n } = req;
	const { language } = i18n;

	const translations = getTranslations(enTranslation, cyTranslation);

	console.log('translations::: ', translations);

	i18n.addResourceBundle(language, haveYourSayGuideIndexI18nNamespace, translations[language]);

	next();
};

module.exports = { addIndexTranslationsMiddleware };
