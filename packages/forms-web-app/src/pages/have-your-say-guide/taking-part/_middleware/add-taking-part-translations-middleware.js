const { getTranslations } = require('../../../_utils/get-translations');
const enTranslation = require('../_translations/en.json');
const cyTranslation = require('../_translations/cy.json');
const { takingPartI18nNamespace } = require('../config');

const addTakingPartTranslationsMiddleware = (req, res, next) => {
	const { i18n } = req;
	const { language } = i18n;

	const translations = getTranslations(enTranslation, cyTranslation);

	i18n.addResourceBundle(language, takingPartI18nNamespace, translations[language]);

	next();
};

module.exports = { addTakingPartTranslationsMiddleware };
