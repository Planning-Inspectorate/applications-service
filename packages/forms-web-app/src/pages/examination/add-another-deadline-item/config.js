const addAnotherDeadlineItemOptionValues = {
	1: 'yes',
	2: 'no'
};

const getAddAnotherDeadlineOptions = (i18n) => ({
	1: {
		value: addAnotherDeadlineItemOptionValues[1],
		text: i18n.t('common.yes2')
	},
	2: {
		value: addAnotherDeadlineItemOptionValues[2],
		text: i18n.t('common.no2')
	}
});

module.exports = { addAnotherDeadlineItemOptionValues, getAddAnotherDeadlineOptions };
