/* eslint-disable camelcase */
const { getTimetables: getTimetablesByCaseRef } = require('../lib/application-api-wrapper');

const getTimetables = (case_ref) => {
	return getTimetablesByCaseRef(case_ref);
};

module.exports = {
	getTimetables
};
