const { mapTitles } = require('../../../../_utils/map-titles');

const getTitles = (view, i18n) => {
	const titles = {
		index: mapTitles(i18n.t('getUpdatesHowOften.index.heading1')),
		error: mapTitles(
			i18n.t('getUpdatesHowOften.error.heading1'),
			i18n.t('getUpdatesHowOften.error.title1')
		)
	};
	return titles[view];
};

module.exports = { getTitles };
