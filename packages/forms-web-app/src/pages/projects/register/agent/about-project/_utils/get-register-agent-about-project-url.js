const { registerAboutProjectRoute } = require('../../../_common/about-project/config');
const { getRegisterAgentURL } = require('../../_utils/get-register-agent-url');

const getRegisterAgentAboutProjectURL = (caseRef) => {
	const registerAgentURL = getRegisterAgentURL(caseRef);

	return `${registerAgentURL}/${registerAboutProjectRoute}`;
};

module.exports = { getRegisterAgentAboutProjectURL };
