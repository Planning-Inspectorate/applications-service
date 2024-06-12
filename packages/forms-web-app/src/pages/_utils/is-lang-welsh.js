const { locales } = require('../../locales/config');

const isLangWelsh = (lang) => lang === locales.cy.code;

module.exports = { isLangWelsh };
