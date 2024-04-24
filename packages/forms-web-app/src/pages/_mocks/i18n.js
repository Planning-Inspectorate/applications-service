const mockI18n = (namespace, translation) => ({
	t: (i18nKey) => {
		// Copy translation object with the namespace added as the first key
		let translationObj = {
			[namespace]: translation
		};

		i18nKey.split('.').forEach((key) => {
			translationObj = translationObj[key];
		});

		return translationObj;
	}
});

module.exports = { mockI18n };
