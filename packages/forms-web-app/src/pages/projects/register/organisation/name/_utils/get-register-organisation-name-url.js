const { registerNameRoute } = require('../../../_common/name/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationNameURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerNameRoute}`;
};

module.exports = { getRegisterOrganisationNameURL };
