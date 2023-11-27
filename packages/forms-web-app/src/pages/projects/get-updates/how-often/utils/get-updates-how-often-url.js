const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesHowOftenRoute } = require('../config');

const getUpdatesHowOftenURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesHowOftenRoute}`;
};

module.exports = { getUpdatesHowOftenURL };
