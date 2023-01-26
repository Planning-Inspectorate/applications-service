const { convertFiltersToPageView } = require('./convertFiltersToPageView');
const { orderFilters } = require('./order-filters');
const { viewModel } = require('./view-model');

const getFilters = (rawFilters, rawQuery) => {
	const orderedFilters = orderFilters(rawFilters);
	const mappedFilters = convertFiltersToPageView(orderedFilters);

	const { filters, activeFilters } = viewModel(mappedFilters, rawQuery);
	return {
		filters,
		activeFilters
	};
};

module.exports = {
	getFilters
};
