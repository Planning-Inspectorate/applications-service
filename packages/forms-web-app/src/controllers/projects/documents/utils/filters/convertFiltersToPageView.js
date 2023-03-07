const {
	formatValueToValidElementId
} = require('../../../../../utils/format-value-to-valid-element-id');
const { formatName, formatNameWithCount } = require('./formatters');
const { mapFilterTypeToCheckBox } = require('./mappers');
const convertFilterToPageView = (filter, type) => {
	return {
		idPrefix: formatValueToValidElementId(`${filter.name} ${filter.value}`),
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
