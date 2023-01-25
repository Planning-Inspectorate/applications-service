const { makeIntoArray } = require('../../../../examination/select-file/utils/helpers');
const { filterParams } = require('./filter-params');
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
							text: item.value,
							params: filterParams(localQuery, { key: filterObj.name, value: item.value })
						});
					}
				});
				activeFilters.push(active);
			}
		}
	});

	return {
		filterVM: filterCopy,
		activeFilters
	};
};

module.exports = {
	viewModel
};
