const { makeIntoArray } = require('../../../examination/select-file/utils/helpers');
const {
	getActiveFilterQueryParamsWithRemovedFilter
} = require('../../../projects/documents/utils/filters/get-active-filter-query-params-with-removed-filter');

const getActiveFiltersViewModel = (query, filters) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const filtersCopy = JSON.parse(JSON.stringify(filters));

	const activeFilters = [];

	filtersCopy.forEach((filterObj) => {
		for (const [key, value] of Object.entries(localQuery)) {
			if (key === filterObj.name) {
				let active = {
					label: filterObj.label,
					tags: []
				};
				filterObj.items.forEach((item) => {
					if (makeIntoArray(value).includes(item.value)) {
						item.checked = true;

						active.tags.push({
							icon: 'close',
							textHtml: `<span class="govuk-visually-hidden">Remove</span> ${item.label} <span class="govuk-visually-hidden">filter</span>`,
							link: `${getActiveFilterQueryParamsWithRemovedFilter(localQuery, {
								key: filterObj.name,
								value: item.value
							})}`
						});
					}
				});
				activeFilters.push(active);
			}
		}
	});

	return {
		filters: filtersCopy,
		activeFilters
	};
};

module.exports = {
	getActiveFiltersViewModel
};
