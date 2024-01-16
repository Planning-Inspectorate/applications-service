const { registerCompleteRoute } = require('../../../_common/complete/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfCompleteURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerCompleteRoute}`;
};

module.exports = { getRegisterMyselfCompleteURL };
