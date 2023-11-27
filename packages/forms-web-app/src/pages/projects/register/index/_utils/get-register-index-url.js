const { getRegisterURL } = require('../../_utils/get-register-url');
const { registerIndexRoute } = require('../config');

const getRegisterIndexURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);
	const registerIndexPath = registerIndexRoute ? `/${registerIndexRoute}` : '';

	return `${registerURL}${registerIndexPath}`;
};

module.exports = { getRegisterIndexURL };
