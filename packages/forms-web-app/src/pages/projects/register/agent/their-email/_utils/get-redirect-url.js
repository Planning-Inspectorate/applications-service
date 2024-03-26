const { isQueryModeEdit } = require('../../../../../../controllers/utils/is-query-mode-edit');
const {
	getRegisterAgentCheckAnswersURL
} = require('../../check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterAgentTheirAddressURL
} = require('../../their-address/_utils/get-register-agent-their-address-url');

const getRedirectURL = (caseRef, query) =>
	isQueryModeEdit(query)
		? getRegisterAgentCheckAnswersURL(caseRef)
		: getRegisterAgentTheirAddressURL(caseRef);

module.exports = { getRedirectURL };
