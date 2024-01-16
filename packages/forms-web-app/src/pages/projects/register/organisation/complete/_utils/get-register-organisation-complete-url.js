const { registerCompleteRoute } = require('../../../_common/complete/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationCompleteURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerCompleteRoute}`;
};

module.exports = { getRegisterOrganisationCompleteURL };
