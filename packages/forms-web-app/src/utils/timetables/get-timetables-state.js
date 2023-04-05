const { getTimetables } = require('../../lib/application-api-wrapper');
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

const getHasOpenTimetables = async (case_ref) => {
	const { data } = await getTimetables(case_ref);
	let response = false;
	if (data && data.timetables) {
		const openEventDeadlineTimetables = getOpenEventDeadlineTimetables(data.timetables);
		response = openEventDeadlineTimetables.length > 0;
	}
	return response;
};

module.exports = {
	getPastTimetables,
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables,
	getHasOpenTimetables
};
