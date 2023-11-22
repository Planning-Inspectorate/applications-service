const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesEmailRoute } = require('../config');

const getUpdatesEmailURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesEmailRoute}`;
};

module.exports = { getUpdatesEmailURL };
