const { mapQueryToFilterBody } = require('./mapQueryToFilterBody');

const getBody = (case_ref, query) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const searchTerm = localQuery.searchTerm;

	const page = localQuery.page;

	delete localQuery.page;
	delete localQuery.searchTerm;
	const filterBody = mapQueryToFilterBody(localQuery);

	return {
		caseReference: case_ref,
		filters: filterBody,
		searchTerm,
		page: parseInt(page) || 1
	};
};

module.exports = {
	getBody
};
