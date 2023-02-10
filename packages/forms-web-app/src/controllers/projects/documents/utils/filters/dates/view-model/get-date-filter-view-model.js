const { getDateFilterFormGroupsViewModel } = require('./get-date-filter-form-groups-view-model');

const getDateFilterViewModel = (query, dateFilter) => [
	{
		errorSummary:
			dateFilter.errorSummaryList.length > 0
				? {
						list: dateFilter.errorSummaryList,
						title: 'There is a problem'
				  }
				: null,
		formGroups: getDateFilterFormGroupsViewModel(query, dateFilter.formGroups),
		isOpen: dateFilter.errorSummaryList.length > 0,
		title: dateFilter.title,
		type: 'date'
	}
];

module.exports = { getDateFilterViewModel };
