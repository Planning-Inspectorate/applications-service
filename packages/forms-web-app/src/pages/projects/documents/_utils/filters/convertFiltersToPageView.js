const {
	formatValueToValidElementId
} = require('../../../../../utils/format-value-to-valid-element-id');
const { formatName, formatNameWithCount } = require('./formatters');
const { mapFilterTypeToCheckBox } = require('./mappers');

const getFilterLabel = (i18n, filter) => {
	const { language } = i18n;

	return filter.label[language] || filter.value;
};

const convertFilterToPageView = (i18n, filter, type) => {
	const filterLabel = getFilterLabel(i18n, filter);

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

const convertFiltersToPageView = (i18n, filters) =>
	filters.map((filter) => convertFilterToPageView(i18n, filter, 'checkbox'));

module.exports = {
	convertFiltersToPageView
};
