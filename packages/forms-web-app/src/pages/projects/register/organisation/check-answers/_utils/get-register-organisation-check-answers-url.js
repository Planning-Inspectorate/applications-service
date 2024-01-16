const { registerCheckAnswersRoute } = require('../../../_common/check-answers/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');

const getRegisterOrganisationCheckAnswersURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);

	return `${registerOrganisationURL}/${registerCheckAnswersRoute}`;
};

module.exports = { getRegisterOrganisationCheckAnswersURL };
