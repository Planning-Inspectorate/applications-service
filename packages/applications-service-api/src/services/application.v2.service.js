const { getByCaseReference } = require('../repositories/project.repository');

const getApplication = async (caseReference) => getByCaseReference(caseReference);

module.exports = {
	getApplication
};
