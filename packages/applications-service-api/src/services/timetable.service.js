const { isBackOfficeCaseReference } = require('../utils/is-backoffice-case-reference');
const {
	getTimetablesByCaseReference: getBackOfficeTimetable
} = require('../repositories/timetable.backoffice.repository');
const {
	getTimetablesByCaseReference: getNITimetable
} = require('../repositories/timetable.ni.repository');

const { mapBackOfficeTimetableToApi, mapNITimetableToApi } = require('../utils/timetable.mapper');

const getTimetables = async (caseReference) =>
	isBackOfficeCaseReference(caseReference)
		? mapBackOfficeTimetableToApi(await getBackOfficeTimetable(caseReference))
		: mapNITimetableToApi(await getNITimetable(caseReference));

module.exports = {
	getTimetables
};
