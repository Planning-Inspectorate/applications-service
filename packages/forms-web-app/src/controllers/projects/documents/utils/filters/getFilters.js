const { convertFiltersToPageView } = require('./convertFiltersToPageView');
const { orderFilters } = require('./order-filters');
const { viewModel } = require('./view-model');

const getFilters = (filters, query) => {
	const orderedFilters = orderFilters(filters);
	const mappedFilters = convertFiltersToPageView(orderedFilters);

	const { filterVM, activeFilters } = viewModel(mappedFilters, query);
	return {
		filters: filterVM,
		activeFilters
	};
};

module.exports = {
	getFilters
};
