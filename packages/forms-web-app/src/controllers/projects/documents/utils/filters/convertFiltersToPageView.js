const { formatName, formatNameWithCount } = require('./formatters');
const { mapFilterTypeToCheckBox } = require('./mappers');
const convertFiltersToPageView = (filters) =>
	filters.map((filter) => ({
		name: formatName(filter),
		idPrefix: formatName(filter),
		title: formatNameWithCount(filter.label, filter.count),
		items: mapFilterTypeToCheckBox(filter.type)
	}));

module.exports = {
	convertFiltersToPageView
};
