const { registerProcessSubmissionRoute } = require('../../../_common/process-submission/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');
const getRegisterMyselfProcessSubmissionURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);
	return `${registerMyselfURL}/${registerProcessSubmissionRoute}`;
};
module.exports = { getRegisterMyselfProcessSubmissionURL };
