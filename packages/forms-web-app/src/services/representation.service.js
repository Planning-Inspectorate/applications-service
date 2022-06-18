const { getRepresentationById } = require('../lib/application-api-wrapper');

// eslint-disable-next-line camelcase
const getRepresentation = async (id) => {
	return getRepresentationById(id);
};

module.exports = {
	getRepresentation
};
