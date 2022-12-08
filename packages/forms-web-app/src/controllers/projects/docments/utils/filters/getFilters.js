const { convertFiltersToPageView } = require('./convertFiltersToPageView');
const { viewModel } = require('./view-model');

const getFilters = (filters, query) => {
	const mappedFilters = convertFiltersToPageView(filters);

	return viewModel(mappedFilters, query);
};

module.exports = {
	getFilters
};
