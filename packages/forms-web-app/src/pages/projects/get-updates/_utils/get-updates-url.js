const { getProjectsURL } = require('../../_utils/get-projects-url');
const { getUpdatesRoute } = require('../config');

const getUpdatesURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);
	return `${projectsURL}/${getUpdatesRoute}`;
};

module.exports = { getUpdatesURL };
