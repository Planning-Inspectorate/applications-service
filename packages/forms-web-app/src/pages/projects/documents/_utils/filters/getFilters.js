const { convertFiltersToPageView } = require('./convertFiltersToPageView');
const { orderFilters } = require('./order-filters');
const { viewModel } = require('./view-model');
const { getDatesFilter } = require('./dates/get-dates-filter');

const getFilters = (i18n, rawFilters, rawQuery) => {
	const orderedFilters = orderFilters(rawFilters);
	const mappedFilters = convertFiltersToPageView(i18n, orderedFilters);
	const { filters, activeFilters } = viewModel(mappedFilters, rawQuery);
	const { activeDateFilters, datesFilter, datesFilterErrorSummary } = getDatesFilter(rawQuery);

	return {
		activeFilters: [...activeFilters, ...activeDateFilters],
		filters: [...filters, ...datesFilter],
		datesFilterErrorSummary
	};
};

module.exports = {
	getFilters
};
