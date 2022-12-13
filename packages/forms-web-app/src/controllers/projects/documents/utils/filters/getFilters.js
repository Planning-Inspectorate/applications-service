const { convertFiltersToPageView } = require('./convertFiltersToPageView');
const { orderFilters } = require('./order-filters');
const { viewModel } = require('./view-model');

const getFilters = (filters, query) => {
	const orderedFilters = orderFilters(filters);
	const mappedFilters = convertFiltersToPageView(orderedFilters);
	return viewModel(mappedFilters, query);
};

module.exports = {
	getFilters
};
