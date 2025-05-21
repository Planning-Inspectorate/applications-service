const {
	formatValueToValidElementId
} = require('../../../../utils/format-value-to-valid-element-id');
const { isLangWelsh } = require('../../../_utils/is-lang-welsh');

const orderFilterGroups = (filterGroups) => {
	const regionIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'region');

	if (regionIndex >= 0 && regionIndex !== 0) {
		const regionElement = filterGroups[regionIndex];
		filterGroups.splice(regionIndex, 1);
		filterGroups.splice(0, 0, regionElement);
	}

	const sectorIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'sector');

	if (sectorIndex >= 0 && sectorIndex !== 1) {
		const sectorElement = filterGroups[sectorIndex];
		filterGroups.splice(sectorIndex, 1);
		filterGroups.splice(1, 0, sectorElement);
	}

	const stageIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'stage');

	if (stageIndex >= 0 && stageIndex !== 2) {
		const stageElement = filterGroups[stageIndex];
		filterGroups.splice(stageIndex, 1);
		filterGroups.splice(2, 0, stageElement);
	}

	return filterGroups;
};

const getFilterLabel = (i18n, name) => i18n.t(`projectSearch.filterLabels.${name}`) || name;

const filterGroupTypeViewModel = (i18n, { count, label, label_cy, value }) => {
	const filterName = isLangWelsh(i18n.language) ? label_cy : label;
	return {
		checked: false,
		label: filterName,
		text: `${filterName} (${count})`,
		value
	};
};

const getFilterGroupIndex = (filterGroups, filter) =>
	filterGroups.findIndex((filterGroup) => filterGroup.name === filter.name);

const filterGroupViewModel = (i18n, { name }) => {
	const filterLabel = getFilterLabel(i18n, name);

	return {
		idPrefix: formatValueToValidElementId(`${name} option`),
		isOpen: false,
		items: [],
		label: filterLabel,
		name,
		title: filterLabel,
		type: 'checkbox'
	};
};

const hasFilterGroup = (filterGroups, filter) =>
	filterGroups.find((filterGroup) => filterGroup.name === filter.name);

// north to south order
const locationOrder = [
	'north_west',
	'north_east',
	'yorkshire_and_the_humber',
	'west_midlands',
	'east_midlands',
	'eastern',
	'south_west',
	'south_east',
	'london',
	'wales'
];

// order of completion
const stageOrder = [
	'pre_application',
	'acceptance',
	'pre_examination',
	'examination',
	'recommendation',
	'decision',
	'post_decision',
	'withdrawn'
];

const orderFilterItems = (items, orderItems) => {
	const orderedItems = [];
	orderItems.forEach((orderItem) => {
		const itemIndex = items.findIndex((item) => item.value === orderItem);

		if (itemIndex >= 0) {
			const itemElement = items[itemIndex];
			orderedItems.push(itemElement);
		}
	});
	return orderedItems;
};

const getFiltersViewModel = (i18n, filters) => {
	const filterGroups = [];

	filters.forEach((filter) => {
		if (!hasFilterGroup(filterGroups, filter))
			filterGroups.push(filterGroupViewModel(i18n, filter));

		filterGroups[getFilterGroupIndex(filterGroups, filter)].items.push(
			filterGroupTypeViewModel(i18n, filter)
		);
	});

	const locationIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'region');

	if (locationIndex >= 0) {
		filterGroups[locationIndex].items = orderFilterItems(
			filterGroups[locationIndex]?.items,
			locationOrder
		);
	}

	const stageIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'stage');

	if (stageIndex >= 0) {
		filterGroups[stageIndex].items = orderFilterItems(filterGroups[stageIndex]?.items, stageOrder);
	}

	return orderFilterGroups(filterGroups);
};

module.exports = { getFiltersViewModel };
