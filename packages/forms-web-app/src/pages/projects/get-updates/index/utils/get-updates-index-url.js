const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesIndexRoute } = require('../config');

const getUpdatesIndexURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesIndexRoute}`;
};

module.exports = { getUpdatesIndexURL };
