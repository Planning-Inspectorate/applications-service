const { formatName, formatNameWithCount } = require('./formatters');
const { mapTitleToStringValue, mapFilterTypeToCheckBox } = require('./mappers');
const convertFiltersToPageView = (filters) =>
	filters.map((filter) => ({
		name: formatName(filter),
		idPrefix: formatName(filter),
		title: formatNameWithCount(mapTitleToStringValue(filter.name, filter.value), filter.count),
		items: mapFilterTypeToCheckBox(filter.type)
	}));

module.exports = {
	convertFiltersToPageView
};
