const viewModel = (filters, query) => {
	console.log('HERE: ', query, filters);

	const localQuery = [...Object.keys(query)];
	const filterCopy = [...filters];

	console.log('Local: ', localQuery);

	filterCopy.forEach((filterObj) => {
		if (localQuery.contains(filterObj.name)) {
			filterObj.items.find();
		}
	});

	return true;
};

module.exports = {
	viewModel
};
