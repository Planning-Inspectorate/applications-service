const {
	getTimetablesByCaseReference: getBackOfficeTimetable
} = require('../repositories/timetable.backoffice.repository');

const { mapBackOfficeTimetableToApi } = require('../utils/timetable.mapper');

const getTimetables = async (caseReference) =>
	mapBackOfficeTimetableToApi(await getBackOfficeTimetable(caseReference));

module.exports = {
	getTimetables
};
