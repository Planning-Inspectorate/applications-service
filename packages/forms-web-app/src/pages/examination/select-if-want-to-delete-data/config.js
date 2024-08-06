const selectIfWantToDeleteDataOptionValues = {
	1: 'yes',
	2: 'no'
};

const getSelectIfWantToDeleteDataOptions = (i18n) => ({
	1: {
		value: selectIfWantToDeleteDataOptionValues[1],
		text: i18n.t('common.yes1')
	},
	2: {
		value: selectIfWantToDeleteDataOptionValues[2],
		text: i18n.t('common.no1')
	}
});

module.exports = { selectIfWantToDeleteDataOptionValues, getSelectIfWantToDeleteDataOptions };
