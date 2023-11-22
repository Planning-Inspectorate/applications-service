const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesConfirmYourEmailRoute } = require('../config');

const getUpdatesConfirmYourEmailURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesConfirmYourEmailRoute}`;
};

module.exports = { getUpdatesConfirmYourEmailURL };
