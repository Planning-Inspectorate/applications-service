const {
	formatValueToValidElementId
} = require('../../../../utils/format-value-to-valid-element-id');

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

const filterGroupTypeViewModel = ({ count, label, value }) => ({
	checked: false,
	label,
	text: `${label} (${count})`,
	value
});

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

const getFiltersViewModel = (i18n, filters) => {
	const filterGroups = [];

	filters.forEach((filter) => {
		if (!hasFilterGroup(filterGroups, filter))
			filterGroups.push(filterGroupViewModel(i18n, filter));

		filterGroups[getFilterGroupIndex(filterGroups, filter)].items.push(
			filterGroupTypeViewModel(filter)
		);
	});

	const locationIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'region');

	if (locationIndex >= 0) {
		filterGroups[locationIndex].items = orderLocationItems(filterGroups[locationIndex]?.items);
	}

	return orderFilterGroups(filterGroups);
};

const orderLocationItems = (items) => {
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
	const orderedItems = [];
	locationOrder.forEach((region) => {
		const regionIndex = items.findIndex((item) => item.value === region);

		if (regionIndex >= 0) {
			const regionElement = items[regionIndex];
			orderedItems.push(regionElement);
		}
	});
	return orderedItems;
};

module.exports = { getFiltersViewModel };
