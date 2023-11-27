const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesSubscribedRoute } = require('../config');

const getUpdatesSubscribedURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesSubscribedRoute}`;
};

module.exports = { getUpdatesSubscribedURL };
