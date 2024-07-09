const getHasInterestedPartyNumberOptions = (i18n) => {
	return {
		1: {
			value: 'yes',
			text: i18n.t('common.yes2')
		},
		2: {
			value: 'no',
			text: i18n.t('common.no2')
		}
	};
};

module.exports = {
	getHasInterestedPartyNumberOptions
};
