const { datesFilterFormGroupsConfig } = require('../../../dates/config');
const { formatDate } = require('../../../../../../../utils/date-utils');
const {
	getDatesFilterPublishedDates
} = require('../../../dates/utils/get-dates-filter-published-dates');
const { getActiveDateFilterViewModel } = require('../view-model/get-active-date-filter-view-model');

const getActiveDateFilters = (query) => {
	const activeFilterDatesArray = [];
	const { datePublishedFrom, datePublishedTo } = getDatesFilterPublishedDates(query);

	if (datePublishedFrom) {
		activeFilterDatesArray.push(
			getActiveDateFilterViewModel(
				query,
				'Date from',
				`documents published before`,
				formatDate(datePublishedFrom),
				datesFilterFormGroupsConfig.from.name
			)
		);
	}

	if (datePublishedTo) {
		activeFilterDatesArray.push(
			getActiveDateFilterViewModel(
				query,
				'Date to',
				`documents published after`,
				formatDate(datePublishedTo),
				datesFilterFormGroupsConfig.to.name
			)
		);
	}

	return activeFilterDatesArray;
};

module.exports = { getActiveDateFilters };
