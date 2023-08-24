const { getProjectData, getAllProjectList } = require('../lib/application-api-wrapper');

const getProjectList = async () => {
	const response = await getAllProjectList();

	if (response.resp_code !== 200) throw new Error('Application list response status not 200');

	return response.data;
};

// eslint-disable-next-line camelcase
const getAppData = async (case_ref) => {
	const projectData = await getProjectData(case_ref);
	return projectData;
};

module.exports = {
	getProjectList,
	getAppData
};
