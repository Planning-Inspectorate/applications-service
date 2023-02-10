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
		const formattedDatePublishedFrom = formatDate(datePublishedFrom);
		activeFilterDatesArray.push(
			getActiveDateFilterViewModel(
				query,
				'Date from',
				`Remove documents published before ${formattedDatePublishedFrom} filter`,
				formattedDatePublishedFrom,
				datesFilterFormGroupsConfig.from.name
			)
		);
	}

	if (datePublishedTo) {
		const formattedDatePublishedTo = formatDate(datePublishedTo);
		activeFilterDatesArray.push(
			getActiveDateFilterViewModel(
				query,
				'Date to',
				`Remove documents published after ${formattedDatePublishedTo} filter`,
				formattedDatePublishedTo,
				datesFilterFormGroupsConfig.to.name
			)
		);
	}

	return activeFilterDatesArray;
};

module.exports = { getActiveDateFilters };
