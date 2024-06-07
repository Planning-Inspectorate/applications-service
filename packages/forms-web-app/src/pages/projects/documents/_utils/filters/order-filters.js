const orderFilters = (filters) => {
	const developersApplicationIndex = filters.findIndex(
		(filter) => filter.label.en === `Developer's application`
	);

	if (developersApplicationIndex >= 0 && developersApplicationIndex !== 1) {
		const developersApplicationElement = filters[developersApplicationIndex];
		filters.splice(developersApplicationIndex, 1);
		filters.splice(1, 0, developersApplicationElement);
		return filters;
	} else return filters;
};

module.exports = { orderFilters };
