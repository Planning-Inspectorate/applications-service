const { relevantRepresentationRouteParam } = require('../config');
const { getRelevantRepresentationsURL } = require('./get-relevant-representations-url');

const getRelevantRepresentationURL = (caseRef, id = `:${relevantRepresentationRouteParam}`) => {
	const relevantRepresentationsURL = getRelevantRepresentationsURL(caseRef);
	return `${relevantRepresentationsURL}/${id}`;
};

module.exports = { getRelevantRepresentationURL };
