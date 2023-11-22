const { getProjectsURL } = require('../../_utils/get-projects-url');
const { representationsRoute } = require('../config');

const getRepresentationsURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${representationsRoute}`;
};

module.exports = { getRepresentationsURL };
