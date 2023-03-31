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

module.exports = { getPastTimetables, getUpcomingTimetables, getOpenEventDeadlineTimetables };
