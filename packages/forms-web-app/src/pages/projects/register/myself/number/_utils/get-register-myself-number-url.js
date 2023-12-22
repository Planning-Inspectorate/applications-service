const { registerNumberRoute } = require('../../../_common/number/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfNumberURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerNumberRoute}`;
};

module.exports = { getRegisterMyselfNumberURL };
