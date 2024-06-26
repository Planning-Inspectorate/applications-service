const { mapTitles } = require('../../../../_utils/map-titles');

const getTitles = (responseCode, i18n) => {
	const titles = {
		204: mapTitles(i18n.t('getUpdatesSubscribed.successful.title1')),
		400: mapTitles(
			i18n.t('getUpdatesSubscribed.linkExpired.heading1'),
			i18n.t('getUpdatesSubscribed.linkExpired.title1')
		),
		500: mapTitles(
			i18n.t('getUpdatesSubscribed.unsuccessful.heading1'),
			i18n.t('getUpdatesSubscribed.unsuccessful.title1')
		)
	};
	return titles[responseCode];
};

module.exports = { getTitles };
