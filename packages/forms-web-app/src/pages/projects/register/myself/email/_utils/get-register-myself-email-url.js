const { registerEmailRoute } = require('../../../_common/email/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfEmailURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerEmailRoute}`;
};

module.exports = { getRegisterMyselfEmailURL };
