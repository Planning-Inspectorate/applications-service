const { checkBoxMapper } = require('../v2/filters/utils/ui-mappers');
const mapFilterTypeToCheckBox = (types) =>
	types.map((type) => checkBoxMapper(`${type.value} (${type.count})`, 0, false));

const viewModel = (filters) => {
	let temp = [];
	filters.forEach((filter) => {
		temp.push(filter.type);
	});
	return temp[0];
};
const getFilters = (filters) => {
	const convertFiltersToPageView = filters.map((filter) => ({
		name: filter.name,
		value: filter.value,
		count: filter.count,
		type: mapFilterTypeToCheckBox(filter.type)
	}));

	return viewModel(convertFiltersToPageView);
};

module.exports = {
	getFilters
};
