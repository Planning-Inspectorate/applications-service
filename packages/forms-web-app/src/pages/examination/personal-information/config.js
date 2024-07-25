const personalInformationOptionValues = {
	1: 'yes',
	2: 'no'
};

const getPersonalInformationOptions = (i18n) => ({
	1: {
		value: personalInformationOptionValues[1],
		text: i18n.t('common.yes3')
	},
	2: {
		value: personalInformationOptionValues[2],
		text: i18n.t('common.no3')
	}
});

module.exports = { personalInformationOptionValues, getPersonalInformationOptions };
