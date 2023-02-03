const { I18n } = require('i18n');
const path = require('path');
const configureI18n = (app) => {
	const i18n = new I18n({
		locales: ['en', 'cy'],
		// queryParameter: 'lang',
		objectNotation: true,
		defaultLocale: 'en',
		cookie: 'lang',
		register: global,
		directory: path.join(__dirname, 'locales')
	});

	app.use(i18n.init);

	return i18n;
};

module.exports = {
	configureI18n
};
