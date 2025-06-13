const { registerAlreadySubmittedRoute } = require('../../../_common/already-registered/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfAlreadyRegisteredURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerAlreadySubmittedRoute}`;
};

module.exports = { getRegisterMyselfAlreadyRegisteredURL };
