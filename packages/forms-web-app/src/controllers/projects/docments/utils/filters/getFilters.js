const { checkBoxMapper } = require('../v2/filters/utils/ui-mappers');
const mapFilterTypeToCheckBox = (types) =>
	types.map((type) => checkBoxMapper(`${type.value} (${type.count})`, type.value, false));
const formatName = (filter) => {
	return `${filter.name} ${filter.value}`;
};

const formatNameWithCount = (filter) => {
	return `${formatName(filter)}  (${filter.count})`;
};
const getFilters = (filters) => {
	const convertFiltersToPageView = filters.map((filter) => ({
		name: formatName(filter),
		idPrefix: formatName(filter),
		title: formatNameWithCount(filter),
		items: mapFilterTypeToCheckBox(filter.type)
	}));

	convertFiltersToPageView.forEach((filter) => {
		console.log('Filter: ', filter);
	});

	return convertFiltersToPageView;
};

module.exports = {
	getFilters
};
