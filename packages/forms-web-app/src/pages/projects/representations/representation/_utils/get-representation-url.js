const { getRepresentationsURL } = require('../../_utils/get-representations-url');
const { representationRouteParam } = require('../config');

const getRepresentationURL = (caseRef, id = `:${representationRouteParam}`) => {
	const representationsURL = getRepresentationsURL(caseRef);

	return `${representationsURL}/${id}`;
};

module.exports = { getRepresentationURL };
