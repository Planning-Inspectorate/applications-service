const { registerAreYou18Route } = require('../../../_common/are-you-18/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfAreYou18URL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerAreYou18Route}`;
};

module.exports = { getRegisterMyselfAreYou18URL };
