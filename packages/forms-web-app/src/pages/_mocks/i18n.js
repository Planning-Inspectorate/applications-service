const mockI18n = (translations, language = 'en') => ({
	language,
	t: (i18nKey, options) => {
		let translation = translations;

		i18nKey.split('.').forEach((key) => {
			translation = translation[key];
		});

		if (!options) return translation;

		Object.keys(options).forEach((option) => {
			translation = translation.replace(`{{-${option}}}`, options[option]);
		});

		return translation;
	}
});

module.exports = { mockI18n };
