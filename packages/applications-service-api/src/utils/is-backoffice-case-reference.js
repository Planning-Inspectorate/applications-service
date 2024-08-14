const config = require('../lib/config');

const isBackOfficeCaseReference = (caseReference) =>
	config.backOfficeIntegration.getAllApplications === 'BO' ||
	config.backOfficeIntegration.caseReferences.includes(caseReference);

module.exports = { isBackOfficeCaseReference };
