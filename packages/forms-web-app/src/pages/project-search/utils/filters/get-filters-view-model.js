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

const getFilterLabel = (name) => {
	switch (name) {
		case 'region':
			return 'Location';
		case 'sector':
			return 'Sector';
		case 'stage':
			return 'Stage';
		default:
			return name;
	}
};

const filterGroupTypeViewModel = ({ count, label, value }) => ({
	checked: false,
	label,
	text: `${label} (${count})`,
	value
});

const getFilterGroupIndex = (filterGroups, filter) =>
	filterGroups.findIndex((filterGroup) => filterGroup.name === filter.name);

const filterGroupViewModel = ({ name }) => {
	const filterLabel = getFilterLabel(name);

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

const getFiltersViewModel = (filters) => {
	const filterGroups = [];

	filters.forEach((filter) => {
		if (!hasFilterGroup(filterGroups, filter)) filterGroups.push(filterGroupViewModel(filter));

		filterGroups[getFilterGroupIndex(filterGroups, filter)].items.push(
			filterGroupTypeViewModel(filter)
		);
	});

	return orderFilterGroups(filterGroups);
};

module.exports = { getFiltersViewModel };
