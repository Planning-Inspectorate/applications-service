const { registerAddressRoute } = require('../../../_common/address/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationAddressURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerAddressRoute}`;
};

module.exports = { getRegisterOrganisationAddressURL };
