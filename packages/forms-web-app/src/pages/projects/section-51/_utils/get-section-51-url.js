const { getProjectsURL } = require('../../_utils/get-projects-url');
const { section51Route } = require('../config');

const getSection51URL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${section51Route}`;
};

module.exports = { getSection51URL };
