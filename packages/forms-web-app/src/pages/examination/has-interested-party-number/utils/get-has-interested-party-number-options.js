const { hasInterestedPartyNumberOptionValues } = require('../config');

const getHasInterestedPartyNumberOptions = (i18n) => ({
	1: {
		value: hasInterestedPartyNumberOptionValues[1],
		text: i18n.t('common.yes2')
	},
	2: {
		value: hasInterestedPartyNumberOptionValues[2],
		text: i18n.t('common.no2')
	}
});

module.exports = {
	getHasInterestedPartyNumberOptions
};
