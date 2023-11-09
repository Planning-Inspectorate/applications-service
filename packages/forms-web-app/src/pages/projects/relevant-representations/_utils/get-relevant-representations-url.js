const { getProjectsURL } = require('../../_utils/get-projects-url');
const { relevantRepresentationsRoute } = require('../config');

const getRelevantRepresentationsURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);
	return `${projectsURL}/${relevantRepresentationsRoute}`;
};

module.exports = { getRelevantRepresentationsURL };
