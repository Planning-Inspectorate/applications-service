const {
	setTimeToEndOfDay,
	getDateNow,
	setTimeToStartOfDay,
	isNullSQLDate
} = require('../date-utils');

//event list triggering open timetable
const openTimetableEventList = ['deadline', 'procedural deadline'].map((event) =>
	event.toLowerCase()
);

const isTimetableTypeOfEventActionable = (typeOfEvent) => {
	const typeOfEventLowerCase = typeOfEvent?.toLowerCase();

	return openTimetableEventList.includes(typeOfEventLowerCase);
};

const isTimetableDateOfEventPast = (dateOfEvent) => setTimeToEndOfDay(dateOfEvent) < getDateNow();

const hasTimetableDeadlineStarted = (dateTimeDeadlineStart) =>
	setTimeToStartOfDay(dateTimeDeadlineStart) <= getDateNow() ||
	isNullSQLDate(new Date(dateTimeDeadlineStart));

const hasDeadlineItemsList = (description) => description?.includes('* ');

const isTimetableTypeOfEventDeadlineOpen = (typeOfEvent, dateOfEvent, dateTimeDeadlineStart) =>
	isTimetableTypeOfEventActionable(typeOfEvent) &&
	!isTimetableDateOfEventPast(dateOfEvent) &&
	hasTimetableDeadlineStarted(dateTimeDeadlineStart);

module.exports = {
	isTimetableTypeOfEventActionable,
	isTimetableDateOfEventPast,
	isTimetableTypeOfEventDeadlineOpen,
	hasDeadlineItemsList
};
