const { getProjectsURL } = require('../../_utils/get-projects-url');
const { registerRoute } = require('../config');

const getRegisterURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${registerRoute}`;
};

module.exports = { getRegisterURL };
