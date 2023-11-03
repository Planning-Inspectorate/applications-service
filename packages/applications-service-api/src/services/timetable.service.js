const config = require('../lib/config');
const {
	getTimetablesByCaseReference: getBackOfficeTimetable
} = require('../repositories/timetable.backoffice.repository');
const {
	getTimetablesByCaseReference: getNITimetable
} = require('../repositories/timetable.ni.repository');

const { mapBackOfficeTimetableToApi, mapNITimetableToApi } = require('../utils/timetable.mapper');

const getTimetables = async (caseReference) =>
	isBackOfficeApplication(caseReference)
		? mapBackOfficeTimetableToApi(await getBackOfficeTimetable(caseReference))
		: mapNITimetableToApi(await getNITimetable(caseReference));

const isBackOfficeApplication = (caseReference) =>
	(
		config.backOfficeIntegration.examinationTimetable.getExaminationTimetable.caseReferences || []
	).includes(caseReference);

module.exports = {
	getTimetables
};
