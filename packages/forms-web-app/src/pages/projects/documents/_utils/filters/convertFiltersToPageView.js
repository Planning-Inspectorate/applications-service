const {
	formatValueToValidElementId
} = require('../../../../../utils/format-value-to-valid-element-id');
const { formatName, formatNameWithCount } = require('./formatters');
const { mapFilterTypeToCheckBox } = require('./mappers');

const convertFilterToPageView = (filter, type) => {
	const filterLabel = filter.label || filter.value;

	return {
		idPrefix: formatValueToValidElementId(`${filter.name} ${filter.value}`),
		isOpen: false,
		items: mapFilterTypeToCheckBox(filter.type),
		label: filterLabel,
		name: formatName(filter),
		title: formatNameWithCount(filterLabel, filter.count),
		type
	};
};

const convertFiltersToPageView = (filters) =>
	filters.map((filter) => convertFilterToPageView(filter, 'checkbox'));

module.exports = {
	convertFiltersToPageView
};
