const { locales } = require('../config');

const getLocaleTranslation = (locale = locales.english, translations) => translations[locale];

module.exports = { getLocaleTranslation };
