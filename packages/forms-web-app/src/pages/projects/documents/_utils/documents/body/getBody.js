const {
	getDatesFilterPublishedDates
} = require('../../dates/utils/get-dates-filter-published-dates');
const { mapQueryToFilterBody } = require('./mapQueryToFilterBody');

const getBody = (case_ref, query) => {
	const { datePublishedFrom, datePublishedTo } = getDatesFilterPublishedDates(query);

	const requestBody = {
		caseReference: case_ref,
		filters: mapQueryToFilterBody(getFilters(query)),
		isMaterialChange: query.isMaterialChange,
		searchTerm: query.searchTerm,
		page: parseInt(query.page) || 1,
		size: Number(query.itemsPerPage) || 25
	};

	if (datePublishedFrom) requestBody.datePublishedFrom = datePublishedFrom;
	if (datePublishedTo) requestBody.datePublishedTo = datePublishedTo;

	return requestBody;
};

const getFilters = (query) =>
	Object.keys(query).reduce((memo, key) => {
		if (key.match(/(stage|category)-/i)) memo[key] = query[key];
		return memo;
	}, {});

module.exports = {
	getBody
};
