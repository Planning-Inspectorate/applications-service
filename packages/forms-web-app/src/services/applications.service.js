const { getAllProjectList } = require('../lib/application-api-wrapper');
const { NotFoundError } = require('../lib/errors');

const getApplications = async (queryString) => {
	const response = await getAllProjectList(queryString);

	if (response.resp_code === 404) {
		throw new NotFoundError(queryString);
	}

	if (response.resp_code !== 200) {
		throw new Error('Applications response status not 200');
	}

	const { data } = response;

	return {
		applications: data.applications,
		filters: data.filters,
		pagination: {
			totalItems: data.totalItems,
			totalItemsWithoutFilters: data.totalItemsWithoutFilters,
			itemsPerPage: data.itemsPerPage,
			totalPages: data.totalPages,
			currentPage: data.currentPage
		}
	};
};

module.exports = { getApplications };
