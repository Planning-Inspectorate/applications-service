const { buildQueryString } = require('./build-query-string');

const getDirectionAndSort = (sortBy, value) => {
	let direction = '+';
	let sort = 'none';

	const isSelectedValue = sortBy ? value === sortBy.substring(1) : false;

	if (isSelectedValue) {
		const isAscending = sortBy.charAt(0) === '+';

		direction = isAscending ? '-' : '+';
		sort = isAscending ? 'ascending' : 'descending';
	}

	return {
		direction,
		sort
	};
};

const getSortByLink = (query, { name, value }) => {
	let sortByLink = {
		name
	};

	if (value) {
		const localQuery = JSON.parse(JSON.stringify(query));

		const { direction, sort } = getDirectionAndSort(localQuery.sortBy, value);

		localQuery.sortBy = `${direction}${value}`;

		sortByLink.link = buildQueryString(localQuery);
		sortByLink.sort = sort;
	}

	return sortByLink;
};

const getSortByLinks = (query, sortByLinks) =>
	sortByLinks.map((sortByLink) => getSortByLink(query, sortByLink));

module.exports = { getSortByLinks };
