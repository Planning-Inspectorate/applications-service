const { getTimetables } = require('../../lib/application-api-wrapper');
const {
	getHasProjectTimetablesSession,
	setHasProjectTimetablesSession
} = require('../../pages/projects/examination-timetable/_session/has-project-timetables-session');
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

const getHasProjectTimetables = async (session, case_ref, forceTimetableLookup) => {
	let hasProjectTimetables = getHasProjectTimetablesSession(session, case_ref);

	if (forceTimetableLookup || hasProjectTimetables === undefined) {
		const { data } = await getTimetables(case_ref);

		hasProjectTimetables = Array.isArray(data?.timetables) && data?.timetables.length > 0;

		setHasProjectTimetablesSession(session, case_ref, hasProjectTimetables);
	}

	return hasProjectTimetables;
};

module.exports = {
	getPastTimetables,
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables,
	getHasProjectTimetables
};
