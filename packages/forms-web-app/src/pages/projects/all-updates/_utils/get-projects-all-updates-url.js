const { getProjectsURL } = require('../../_utils/get-projects-url');
const { projectsAllUpdatesRoute } = require('../config');

const getProjectsAllUpdatesURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${projectsAllUpdatesRoute}`;
};

module.exports = { getProjectsAllUpdatesURL };
