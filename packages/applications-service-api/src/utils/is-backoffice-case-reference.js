const config = require('../lib/config');

const isBackOfficeCaseReference = (caseReference) =>
	caseReference.length === 9 ||
	config.backOfficeIntegration.getAllApplications === 'BO' ||
	config.backOfficeIntegration.caseReferences.includes(caseReference);

module.exports = { isBackOfficeCaseReference };
