const { datesFilterFormGroupsConfig } = require('../../../dates/config');
const { formatDate } = require('../../../../../../../utils/date-utils');
const {
	getDatesFilterPublishedDates
} = require('../../../dates/utils/get-dates-filter-published-dates');
const { getActiveDateFilterViewModel } = require('../view-model/get-active-date-filter-view-model');

const getActiveDateFilters = (i18n, query) => {
	const activeFilterDatesArray = [];
	const { datePublishedFrom, datePublishedTo } = getDatesFilterPublishedDates(query);

	if (datePublishedFrom) {
		activeFilterDatesArray.push(
			getActiveDateFilterViewModel(
				query,
				i18n.t('common.dateFrom'),
				`documents published before`,
				formatDate(datePublishedFrom, i18n.language),
				datesFilterFormGroupsConfig.from.name
			)
		);
	}

	if (datePublishedTo) {
		activeFilterDatesArray.push(
			getActiveDateFilterViewModel(
				query,
				i18n.t('common.dateTo'),
				`documents published after`,
				formatDate(datePublishedTo, i18n.language),
				datesFilterFormGroupsConfig.to.name
			)
		);
	}

	return activeFilterDatesArray;
};

module.exports = { getActiveDateFilters };
