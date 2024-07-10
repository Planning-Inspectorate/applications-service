const { getTimetablesByCaseReference } = require('../repositories/timetable.repository');
const { mapTimetableToAPI } = require('../utils/timetable.mapper');

const getTimetables = async (caseReference) =>
	mapTimetableToAPI(await getTimetablesByCaseReference(caseReference));

module.exports = {
	getTimetables
};
