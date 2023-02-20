const {
	getDatesFilterPublishedDates
} = require('../../dates/utils/get-dates-filter-published-dates');
const { mapQueryToFilterBody } = require('./mapQueryToFilterBody');
const { deleteDatesFilterFromQuery } = require('./delete-dates-filter-from-query');

const getBody = (case_ref, query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const { datePublishedFrom, datePublishedTo } = getDatesFilterPublishedDates(localQuery);
	const searchTerm = localQuery.searchTerm;
	const page = localQuery.page;
	const size = Number(localQuery.itemsPerPage) || 25;

	delete localQuery.page;
	delete localQuery.searchTerm;
	delete localQuery.itemsPerPage;
	deleteDatesFilterFromQuery(localQuery);

	const filterBody = mapQueryToFilterBody(localQuery);

	const requestBody = {
		caseReference: case_ref,
		filters: filterBody,
		searchTerm,
		page: parseInt(page) || 1,
		size
	};

	if (datePublishedFrom) requestBody.datePublishedFrom = datePublishedFrom;
	if (datePublishedTo) requestBody.datePublishedTo = datePublishedTo;

	return requestBody;
};

module.exports = {
	getBody
};
