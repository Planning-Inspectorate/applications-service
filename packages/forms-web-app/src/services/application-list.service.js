const { getProjectData, getAllProjectList } = require('../lib/application-api-wrapper');

const getAppList = async () => {
    const projectList = await getAllProjectList();
    return projectList;
}

const getAppData = async (claim_ref) => {
    const projectData = await getProjectData(claim_ref);
    return projectData;
}

module.exports = {
    getAppList,
    getAppData,
};