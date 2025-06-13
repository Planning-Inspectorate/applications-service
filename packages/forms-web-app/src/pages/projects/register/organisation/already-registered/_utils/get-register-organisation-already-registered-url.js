const { registerAlreadySubmittedRoute } = require('../../../_common/already-registered/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationAlreadyRegisteredURL = (caseRef) => {
	const registerorganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerorganisationURL}/${registerAlreadySubmittedRoute}`;
};

module.exports = { getRegisterOrganisationAlreadyRegisteredURL };
