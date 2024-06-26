const { buildDatesFilterObj } = require('./utils/build-dates-filter-obj');
const { validateDatesFilterObj } = require('./utils/validate-date-filter-obj');
const { getActiveDateFilters } = require('./utils/get-active-date-filters');
const { getDateFilterViewModel } = require('./view-model/get-date-filter-view-model');

const getDatesFilter = (i18n, query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const datesFilterObj = buildDatesFilterObj(i18n);
	const validatedDatesFilterObj = validateDatesFilterObj(i18n, localQuery, datesFilterObj);
	const datesFilter = getDateFilterViewModel(localQuery, validatedDatesFilterObj);
	const datesFilterErrorSummary = datesFilter[0].errorSummary;
	return {
		datesFilter,
		datesFilterErrorSummary,
		activeDateFilters: getActiveDateFilters(i18n, localQuery)
	};
};

module.exports = { getDatesFilter };
