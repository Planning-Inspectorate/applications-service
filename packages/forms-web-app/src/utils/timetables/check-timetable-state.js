const {
	setTimeToEndOfDay,
	getDateNow,
	setTimeToStartOfDay,
	isNullSQLDate
} = require('../date-utils');

const isTimetableTypeOfEventDeadline = (typeOfEvent) => typeOfEvent === 'Deadline';

const isTimetableDateOfEventPast = (dateOfEvent) => setTimeToEndOfDay(dateOfEvent) < getDateNow();

const hasTimetableDeadlineStarted = (dateTimeDeadlineStart) =>
	setTimeToStartOfDay(dateTimeDeadlineStart) <= getDateNow() ||
	isNullSQLDate(new Date(dateTimeDeadlineStart));

const hasDeadlineItemsList = (description) => description?.includes('* ');

const isTimetableTypeOfEventDeadlineOpen = (typeOfEvent, dateOfEvent, dateTimeDeadlineStart) =>
	isTimetableTypeOfEventDeadline(typeOfEvent) &&
	!isTimetableDateOfEventPast(dateOfEvent) &&
	hasTimetableDeadlineStarted(dateTimeDeadlineStart);

module.exports = {
	isTimetableTypeOfEventDeadline,
	isTimetableDateOfEventPast,
	isTimetableTypeOfEventDeadlineOpen,
	hasDeadlineItemsList
};
