const { makeIntoArray } = require('../../../../examination/select-file/utils/helpers');
const {
	getActiveFilterQueryParamsWithRemovedFilter
} = require('./get-active-filter-query-params-with-removed-filter');
const viewModel = (filters, query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const filterCopy = JSON.parse(JSON.stringify(filters));

	const activeFilters = [];

	filterCopy.forEach((filterObj) => {
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
							alt: `Remove ${item.value} filter.`,
							icon: 'close',
							text: item.value,
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
		filters: filterCopy,
		activeFilters
	};
};

module.exports = {
	viewModel
};
