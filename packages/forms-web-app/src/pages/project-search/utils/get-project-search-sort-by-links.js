const { getSortByLinks } = require('../../_utils/get-sort-by-links');

const getProjectSearchSortByLinks = (i18n, query) =>
	getSortByLinks(query, [
		{
			name: i18n.t('projectSearch.sortByLinks.projectName'),
			value: 'ProjectName'
		},
		{
			name: i18n.t('projectSearch.sortByLinks.promoterName'),
			value: 'PromoterName'
		},
		{
			name: i18n.t('projectSearch.sortByLinks.stage'),
			value: 'Stage'
		}
	]);

module.exports = { getProjectSearchSortByLinks };
