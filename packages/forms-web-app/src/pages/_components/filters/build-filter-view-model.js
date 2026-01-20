const { formatValueToValidElementId } = require('../../../utils/format-value-to-valid-element-id');
const { isLangWelsh } = require('../../_utils/is-lang-welsh');

/**
 * Defines the standard order for filter groups (Region, Sector, Stage)
 * @private
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
 * Gets the translated label for a filter group
 * @private
 * @param {Object} i18n - i18n instance
 * @param {string} name - Filter name (region, sector, stage)
 * @param {string} [namespace='projectSearch'] - i18n namespace for filter labels
 */
const getFilterLabel = (i18n, name, namespace = 'projectSearch') =>
	i18n.t(`${namespace}.filterLabels.${name}`) || name;

/**
 * Transforms a single filter item from the API into the checkbox accordion format
 * @private
 */
const filterGroupTypeViewModel = (i18n, { count, label, label_cy, value }) => {
	const filterName = isLangWelsh(i18n.language) ? label_cy : label;
	return {
		checked: false,
		label: filterName,
		text: `${filterName} (${count})`,
		value
	};
};

/**
 * Finds the index of a filter group by name
 * @private
 */
const getFilterGroupIndex = (filterGroups, filter) =>
	filterGroups.findIndex((filterGroup) => filterGroup.name === filter.name);

/**
 * Creates a new filter group structure for the accordion
 * @private
 */
const filterGroupViewModel = (i18n, { name }, namespace) => {
	const filterLabel = getFilterLabel(i18n, name, namespace);

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

/**
 * Checks if a filter group already exists in the list
 * @private
 */
const hasFilterGroup = (filterGroups, filter) =>
	filterGroups.find((filterGroup) => filterGroup.name === filter.name);

// Geographic regions ordered from north to south
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

// Project stages ordered by progression
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

/**
 * Orders filter items according to a predefined list
 * @private
 */
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

/**
 * Transforms raw API filters into checkbox accordion view model format
 *
 * This is the core filter building logic used by both project-search and projects-map.
 * Handles:
 * - Grouping filter items by name (region, sector, stage)
 * - Translating labels (Welsh support)
 * - Ordering filter groups (Region → Sector → Stage)
 * - Ordering items within groups (geographic/chronological order)
 * - Formatting for the uiCheckboxAccordion component
 *
 * @param {Object} i18n - i18n instance with language and translation methods
 * @param {Array} filters - Raw filter items from the API
 * @param {string} [namespace='projectSearch'] - i18n namespace for filter labels
 * @returns {Array} Structured filter groups ready for uiCheckboxAccordion macro
 * @example
 * buildFilterViewModel(i18n, [
 *   { name: 'region', value: 'south_east', label: 'South East', count: 5 },
 *   { name: 'sector', value: 'energy', label: 'Energy', count: 3 }
 * ])
 * // Returns:
 * // [
 * //   {
 * //     name: 'region',
 * //     label: 'Location',
 * //     items: [{ checked: false, label: 'South East', text: 'South East (5)', value: 'south_east' }],
 * //     ...
 * //   },
 * //   ...
 * // ]
 */
const buildFilterViewModel = (i18n, filters, namespace = 'projectSearch') => {
	const filterGroups = [];

	filters.forEach((filter) => {
		if (!hasFilterGroup(filterGroups, filter))
			filterGroups.push(filterGroupViewModel(i18n, filter, namespace));

		filterGroups[getFilterGroupIndex(filterGroups, filter)].items.push(
			filterGroupTypeViewModel(i18n, filter)
		);
	});

	// Order location items by geographic position (north to south)
	const locationIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'region');
	if (locationIndex >= 0) {
		filterGroups[locationIndex].items = orderFilterItems(
			filterGroups[locationIndex]?.items,
			locationOrder
		);
	}

	// Order stage items by project progression
	const stageIndex = filterGroups.findIndex((filterGroup) => filterGroup.name === 'stage');
	if (stageIndex >= 0) {
		filterGroups[stageIndex].items = orderFilterItems(filterGroups[stageIndex]?.items, stageOrder);
	}

	return orderFilterGroups(filterGroups);
};

module.exports = {
	buildFilterViewModel
};
