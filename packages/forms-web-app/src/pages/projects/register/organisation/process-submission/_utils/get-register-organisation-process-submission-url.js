const { registerProcessSubmissionRoute } = require('../../../_common/process-submission/config');
const { getRegisterOrganisationURL } = require('../../_utils/get-register-organisation-url');
const getRegisterOrganisationProcessSubmissionURL = (caseRef) => {
	const registerOrganisationURL = getRegisterOrganisationURL(caseRef);
	return `${registerOrganisationURL}/${registerProcessSubmissionRoute}`;
};
module.exports = { getRegisterOrganisationProcessSubmissionURL };
