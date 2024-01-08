const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');
const { registerAboutProjectRoute } = require('../../../_common/about-project/config');

const getRegisterMyselfAboutProjectURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerAboutProjectRoute}`;
};

module.exports = { getRegisterMyselfAboutProjectURL };
