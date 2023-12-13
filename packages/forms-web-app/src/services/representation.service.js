const { getRepresentationById } = require('../lib/application-api-wrapper');

// eslint-disable-next-line camelcase
const getRepresentation = async (id, caseReference) => {
	return getRepresentationById(id, caseReference);
};

module.exports = {
	getRepresentation
};
