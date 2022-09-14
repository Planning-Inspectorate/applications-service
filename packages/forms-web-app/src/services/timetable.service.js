/* eslint-disable camelcase */
const { getTimetables: getTimetablesByCaseRef } = require('../lib/application-api-wrapper');

const getTimetables = async (case_ref) => {
	return getTimetablesByCaseRef(case_ref);
};

module.exports = {
	getTimetables
};
