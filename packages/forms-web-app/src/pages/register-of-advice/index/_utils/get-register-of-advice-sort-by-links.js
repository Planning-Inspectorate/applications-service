const { getSortByLinks } = require('../../../_utils/get-sort-by-links');

const getRegisterOfAdviceSortByLinks = (i18n, query) =>
	getSortByLinks(query, [
		{
			name: i18n.t('registerOfAdvice.resultsTableHeading1')
		},
		{
			name: i18n.t('registerOfAdvice.resultsTableHeading2')
		},
		{ name: i18n.t('registerOfAdvice.resultsTableHeading3'), value: 'adviceDate' }
	]);

module.exports = { getRegisterOfAdviceSortByLinks };
