const { formatValueToValidElementId } = require('../../../utils/format-value-to-valid-element-id');
const { isLangWelsh } = require('../is-lang-welsh');

/**
 * Order filter groups to display in consistent sequence: region, sector, stage
 * @param {Array} filterGroups - Filter groups to reorder
 * @returns {Array} Reordered filter groups
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
 * Get filter label from i18n using namespace and filter name
 * @param {Object} i18n - Internationalization object
 * @param {string} namespace - i18n namespace (e.g., 'projectSearch', 'projectsMap')
 * @param {string} name - Filter name
 * @returns {string} Translated filter label or name if not found
 */
const getFilterLabel = (i18n, namespace, name) =>
	i18n.t(`${namespace}.filterLabels.${name}`) || name;

/**
 * Build view model for a single filter item (checkbox)
 * @param {Object} i18n - Internationalization object
 * @param {Object} filterItem - Filter item from API
 * @returns {Object} Filter item view model
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
 * Find index of filter group by name
 * @param {Array} filterGroups - Array of filter groups
 * @param {Object} filter - Filter object with name property
 * @returns {number} Index of matching filter group
 */
const getFilterGroupIndex = (filterGroups, filter) =>
	filterGroups.findIndex((filterGroup) => filterGroup.name === filter.name);

/**
 * Build view model for a filter group (accordion section)
 * @param {Object} i18n - Internationalization object
 * @param {string} namespace - i18n namespace
 * @param {Object} filterGroup - Filter group from API
 * @returns {Object} Filter group view model
 */
const filterGroupViewModel = (i18n, namespace, { name }) => {
	const filterLabel = getFilterLabel(i18n, namespace, name);

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
 * Check if filter group exists in array
 * @param {Array} filterGroups - Array of filter groups
 * @param {Object} filter - Filter object with name property
 * @returns {boolean} Whether filter group exists
 */
const hasFilterGroup = (filterGroups, filter) =>
	filterGroups.find((filterGroup) => filterGroup.name === filter.name);

// North to south order for location/region filters
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

// Order of completion for stage filters
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
 * Reorder filter items according to specified order
 * @param {Array} items - Filter items to reorder
 * @param {Array} orderItems - Desired order of item values
 * @returns {Array} Reordered items
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
 * Transform raw filter data to view model format
 *
 * Converts API filter response into structured format suitable for UI rendering.
 * Handles:
 * - Grouping filters by type (region, sector, stage)
 * - Creating checkbox accordion structure
 * - Applying i18n translations
 * - Ordering filters by region/stage position
 *
 * Shared utility used by multiple pages (project-search, projects-map).
 *
 * @param {Object} i18n - Internationalization object for translations
 * @param {string} namespace - i18n namespace (e.g., 'projectSearch', 'projectsMap')
 * @param {Array} filters - Raw filter data from API
 * @returns {Array} Array of filter group view models ready for checkbox accordion
 *
 * @example
 * const filterVM = getFiltersViewModel(i18n, 'projectsMap', apiFilters);
 * // Returns: [
 * //   {
 * //     name: 'region',
 * //     label: 'Location',
 * //     items: [
 * //       { value: 'london', label: 'London', text: 'London (15)', checked: false }
 * //     ]
 * //   },
 * //   ...
 * // ]
 */
const getFiltersViewModel = (i18n, namespace, filters) => {
	const filterGroups = [];

	filters.forEach((filter) => {
		if (!hasFilterGroup(filterGroups, filter))
			filterGroups.push(filterGroupViewModel(i18n, namespace, filter));

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
