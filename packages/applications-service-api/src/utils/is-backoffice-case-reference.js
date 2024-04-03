const config = require('../lib/config');
const isBackOfficeCaseReference = (caseReference) => {
	return config.backOfficeIntegration.caseReferences.includes(caseReference);
};

module.exports = { isBackOfficeCaseReference };
