const { getRepresentationsURL } = require('../../_utils/get-representations-url');
const { representationsIndexRoute } = require('../config');

const getRepresentationsIndexURL = (caseRef) => {
	const representationsURL = getRepresentationsURL(caseRef);
	const representationsIndexPath = representationsIndexRoute ? `/${representationsIndexRoute}` : '';

	return `${representationsURL}${representationsIndexPath}`;
};

module.exports = { getRepresentationsIndexURL };
