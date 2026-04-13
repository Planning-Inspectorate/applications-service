const { registerCompleteRoute } = require('../config');
const { getRegisterURL } = require('../../../_utils/get-register-url');

const getRegisterCompleteURL = (caseRef) => {
	const registerURL = getRegisterURL(caseRef);

	return `${registerURL}/${registerCompleteRoute}`;
};

module.exports = { getRegisterCompleteURL };
