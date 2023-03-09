/* eslint-disable camelcase */
const { searchAdviceDocuments } = require('../lib/application-api-wrapper');

const adviceDocuments = async (params) => {
	return searchAdviceDocuments(params);
};

module.exports = {
	adviceDocuments
};
