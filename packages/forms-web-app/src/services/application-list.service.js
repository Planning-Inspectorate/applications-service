const { getAllProjectList } = require('../lib/application-api-wrapper');

const getAppList = async () => {
    const projectList = await getAllProjectList();
    projectList
    return projectList;
}

module.exports = {
    getAppList,
};