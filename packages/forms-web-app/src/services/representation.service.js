const { getRepresentationById } = require('../lib/application-api-wrapper');

// eslint-disable-next-line camelcase
const getRepresentation = (id) => {
	return getRepresentationById(id);
};

module.exports = {
	getRepresentation
};
