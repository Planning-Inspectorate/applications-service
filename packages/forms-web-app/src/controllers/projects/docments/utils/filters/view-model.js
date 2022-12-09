const { makeIntoArray } = require('../../../../examination/select-file/utils/helpers');
const viewModel = (filters, query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const filterCopy = JSON.parse(JSON.stringify(filters));

	filterCopy.forEach((filterObj) => {
		for (const [key, value] of Object.entries(localQuery)) {
			if (key === filterObj.name) {
				filterObj.items.forEach((item) => {
					if (makeIntoArray(value).includes(item.value)) {
						item.checked = true;
					}
				});
			}
		}
	});

	return filterCopy;
};

module.exports = {
	viewModel
};
