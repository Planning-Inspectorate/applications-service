const { getTimetables } = require('../../lib/application-api-wrapper');
const {
	getTimetablesSession,
	setTimetablesSession
} = require('../../pages/projects/examination-timetable/_session/timetables');
const { isTimetableDateOfEventPast } = require('./check-timetable-state');
const { isTimetableTypeOfEventDeadlineOpen } = require('./check-timetable-state');

const getPastTimetables = (timetables) =>
	timetables.filter(({ dateOfEvent }) => isTimetableDateOfEventPast(dateOfEvent));

const getUpcomingTimetables = (timetables) =>
	timetables.filter(({ dateOfEvent }) => !isTimetableDateOfEventPast(dateOfEvent));

const getOpenEventDeadlineTimetables = (timetables) =>
	timetables.filter(({ typeOfEvent, dateOfEvent, dateTimeDeadlineStart }) =>
		isTimetableTypeOfEventDeadlineOpen(typeOfEvent, dateOfEvent, dateTimeDeadlineStart)
	);

const getHasTimetables = async (session, case_ref) => {
	let hasTimetables = getTimetablesSession(session, case_ref);

	if (hasTimetables === undefined) {
		const { data } = await getTimetables(case_ref);

		hasTimetables = Array.isArray(data?.timetables) && data?.timetables.length > 0;

		setTimetablesSession(session, case_ref, hasTimetables);
	}

	return hasTimetables;
};

module.exports = {
	getPastTimetables,
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables,
	getHasTimetables
};
