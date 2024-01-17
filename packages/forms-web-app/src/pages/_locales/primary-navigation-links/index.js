const { mapLocalesContent } = require('../_utils/map-locales-content');
const { locales } = require('../config');
const cy = require('./cy.json');
const en = require('./en.json');

const getPrimaryNavigationLinksText = () =>
	mapLocalesContent({ [locales.english]: en, [locales.welsh]: cy });

module.exports = { getPrimaryNavigationLinksText };
