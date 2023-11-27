const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesUnsubscribeRoute } = require('../config');

const getUpdatesUnsubscribeURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesUnsubscribeRoute}`;
};

module.exports = { getUpdatesUnsubscribeURL };
