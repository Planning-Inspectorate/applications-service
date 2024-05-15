const { locales } = require('../../locales/config');

const getTranslations = (enTranslations, cyTranslations) => ({
	[locales.en.code]: enTranslations,
	[locales.cy.code]: cyTranslations
});

module.exports = { getTranslations };
