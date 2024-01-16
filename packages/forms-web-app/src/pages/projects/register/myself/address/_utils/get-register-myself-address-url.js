const { registerAddressRoute } = require('../../../_common/address/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfAddressURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerAddressRoute}`;
};

module.exports = { getRegisterMyselfAddressURL };
