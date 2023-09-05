const { getProjectData, getAllProjectList } = require('../lib/application-api-wrapper');

const getApplications = async (queryString) => {
	const response = await getAllProjectList(queryString);

	if (response.resp_code !== 200) throw new Error('Applications response status not 200');

	const { data } = response;

	return {
		applications: data.applications,
		pagination: {
			totalItems: data.totalItems,
			itemsPerPage: data.itemsPerPage,
			totalPages: data.totalPages,
			currentPage: data.currentPage
		}
	};
};

// eslint-disable-next-line camelcase
const getAppData = async (case_ref) => {
	const projectData = await getProjectData(case_ref);
	return projectData;
};

module.exports = {
	getApplications,
	getAppData
};
