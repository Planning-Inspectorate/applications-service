const {
	getActiveFilterQueryParamsWithRemovedFilter
} = require('../../../../_utils/filters/get-active-filter-query-params-with-removed-filter');
const { makeIntoArray } = require('../../../../_utils/make-into-array');

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
							icon: 'close',
							textHtml: `<span class="govuk-visually-hidden">Remove</span> ${item.value} <span class="govuk-visually-hidden">filter</span>`,
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
