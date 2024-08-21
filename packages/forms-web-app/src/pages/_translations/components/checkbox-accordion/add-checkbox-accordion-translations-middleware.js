const { getTranslations } = require('../../../_utils/get-translations');
const enTranslation = require('./en.json');
const cyTranslation = require('./cy.json');

const checkboxAccordionI18nNamespace = 'checkboxAccordion';

const addCheckboxAccordionTranslationsMiddleware = (req, res, next) => {
	const { i18n } = req;
	const { language } = i18n;

	const translations = getTranslations(enTranslation, cyTranslation);

	i18n.addResourceBundle(language, checkboxAccordionI18nNamespace, translations[language]);

	next();
};

module.exports = { addCheckboxAccordionTranslationsMiddleware };
