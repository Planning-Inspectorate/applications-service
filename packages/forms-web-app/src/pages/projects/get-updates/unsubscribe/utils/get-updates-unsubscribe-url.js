const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesUnsubscribeRoute } = require('../config');

const getUpdatesUnsubscribeURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getUpdatesUnsubscribeRoute}`;
};

module.exports = { getUpdatesUnsubscribeURL };
