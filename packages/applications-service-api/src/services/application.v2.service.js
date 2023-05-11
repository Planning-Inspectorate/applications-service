const { getByCaseReference } = require('../repositories/project.repository');

const getApplication = (caseReference) => getByCaseReference(caseReference);

module.exports = {
	getApplication
};
