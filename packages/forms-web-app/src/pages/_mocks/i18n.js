const mockI18n = (translations) => ({
	t: (i18nKey) => {
		let translationObj = translations;

		i18nKey.split('.').forEach((key) => {
			translationObj = translationObj[key];
		});

		return translationObj;
	}
});

module.exports = { mockI18n };
