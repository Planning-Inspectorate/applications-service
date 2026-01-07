const { formatValueToValidElementId } = require('../../../utils/format-value-to-valid-element-id');
const { isLangWelsh } = require('../is-lang-welsh');

/**
 * Shared filter view model builder
 *
 * Transforms raw backend filter data into checkbox-accordion compatible structure
 * Used by multiple pages (project-search, projects-map, etc)
 *
 * @param {Object} i18n - i18n instance
 * @param {Array} filters - Raw filters from backend
 * @param {string} translationNamespace - i18n namespace (e.g., 'projectSearch', 'projectsMap')
 * @returns {Array} Processed filter groups ready for checkbox-accordion component
 */

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

/**
 * Get filter label using page-specific translations
 * Falls back to filter name if translation key not found
 *
 * @param {Object} i18n - i18n instance
 * @param {string} name - Filter name (region, sector, stage)
 * @param {string} translationNamespace - Page namespace for translations
 * @returns {string} Translated filter label
 */
const getFilterLabel = (i18n, name, translationNamespace) =>
	i18n.t(`${translationNamespace}.filterLabels.${name}`) || name;

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

const filterGroupViewModel = (i18n, { name }, translationNamespace) => {
	const filterLabel = getFilterLabel(i18n, name, translationNamespace);

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

const getFiltersViewModel = (i18n, filters, translationNamespace) => {
	const filterGroups = [];

	filters.forEach((filter) => {
		if (!hasFilterGroup(filterGroups, filter)) {
			filterGroups.push(filterGroupViewModel(i18n, filter, translationNamespace));
		}

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
