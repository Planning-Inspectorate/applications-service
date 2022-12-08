const { formatName, formatNameWithCount } = require('./formatters');
const { mapFilterTypeToCheckBox, mapTitleToStringValue } = require('./mappers');

const getFilters = (filters) => {
	const convertFiltersToPageView = filters.map((filter) => ({
		name: formatName(filter),
		idPrefix: formatName(filter),
		title: formatNameWithCount(mapTitleToStringValue(filter.name, filter.value), filter.count),
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
