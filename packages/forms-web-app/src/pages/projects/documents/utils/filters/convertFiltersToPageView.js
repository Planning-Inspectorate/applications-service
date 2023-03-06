const { formatName, formatNameWithCount } = require('./formatters');
const { mapFilterTypeToCheckBox } = require('./mappers');
const convertFilterToPageView = (filter, type) => {
	return {
		idPrefix: formatName(filter),
		isOpen: false,
		items: mapFilterTypeToCheckBox(filter.type),
		label: filter.label,
		name: formatName(filter),
		title: formatNameWithCount(filter.label, filter.count),
		type
	};
};

const convertFiltersToPageView = (filters) =>
	filters.map((filter) => convertFilterToPageView(filter, 'checkbox'));

module.exports = {
	convertFiltersToPageView
};
