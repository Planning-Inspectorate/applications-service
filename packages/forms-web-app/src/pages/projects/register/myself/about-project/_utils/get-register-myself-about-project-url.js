const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');
const { registerMyselfAboutProjectRoute } = require('../config');

const getRegisterMyselfAboutProjectURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerMyselfAboutProjectRoute}`;
};

module.exports = { getRegisterMyselfAboutProjectURL };
