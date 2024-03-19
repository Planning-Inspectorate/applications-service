const {
	getRegisterAgentCheckAnswersURL
} = require('../../agent/check-answers/_utils/get-register-agent-check-answers-url');
const { getRegisterAgentNameURL } = require('../../agent/name/_utils/get-register-agent-name-url');
const {
	getRegisterMyselfCheckAnswersURL
} = require('../../myself/check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterMyselfNameURL
} = require('../../myself/name/_utils/get-register-myself-name-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('../../organisation/check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterOrganisationNameURL
} = require('../../organisation/name/_utils/get-register-organisation-name-url');
const { isRegisteringFor } = require('./helpers');

const getRegisteringForRedirectURL = (caseRef, selectedOption) => {
	let nextURL = null;
	let editURL = null;

	const registeringFor = isRegisteringFor(selectedOption);

	if (registeringFor.agent) {
		nextURL = getRegisterAgentNameURL(caseRef);
		editURL = getRegisterAgentCheckAnswersURL(caseRef);
	} else if (registeringFor.myself) {
		nextURL = getRegisterMyselfNameURL(caseRef);
		editURL = getRegisterMyselfCheckAnswersURL(caseRef);
	} else if (registeringFor.organisation) {
		nextURL = getRegisterOrganisationNameURL(caseRef);
		editURL = getRegisterOrganisationCheckAnswersURL(caseRef);
	}

	return {
		nextURL,
		editURL
	};
};

module.exports = { getRegisteringForRedirectURL };
