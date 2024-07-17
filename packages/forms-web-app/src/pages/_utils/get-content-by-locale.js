const { isLangWelsh } = require('./is-lang-welsh');

const getContentByLocale = (i18n, contentEN, contentCY) =>
	isLangWelsh(i18n.language) && contentCY ? contentCY : contentEN;

module.exports = { getContentByLocale };
