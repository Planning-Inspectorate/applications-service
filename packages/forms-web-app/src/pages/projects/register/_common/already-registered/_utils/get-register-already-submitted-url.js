const { registerAlreadySubmittedRoute } = require('../config');
const { getRegisterURL } = require('../../../_utils/get-register-url');

const getRegisterAlreadySubmittedURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registerAlreadySubmittedRoute}`;
};

module.exports = { getRegisterAlreadySubmittedURL };
