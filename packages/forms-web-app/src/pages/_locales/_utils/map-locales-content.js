const { locales } = require('../config');

const mapLocalesContent = ({ [locales.english]: en, [locales.welsh]: cy }) => {
	return {
		en,
		cy
	};
};

module.exports = { mapLocalesContent };
