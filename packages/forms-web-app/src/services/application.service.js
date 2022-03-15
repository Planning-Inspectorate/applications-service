const { getProjectData, getAllProjectList } = require('../lib/application-api-wrapper');

const getAppList = async () => {
  const projectList = await getAllProjectList();
  return projectList;
};

// eslint-disable-next-line camelcase
const getAppData = async (case_ref) => {
  const projectData = await getProjectData(case_ref);
  return projectData;
};

module.exports = {
  getAppList,
  getAppData,
};
