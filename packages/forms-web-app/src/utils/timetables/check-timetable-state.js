const { setTimeToEndOfDay, getDateNow, getDate, isNullSQLDate } = require('../date-utils');

const eventTypeTriggers = {
	deadline: 'deadline',
	proceduralDeadline: 'procedural deadline'
};

const isEventOfTypeDeadline = (event) => event === eventTypeTriggers.deadline;

const isEventOfTypeProceduralDeadline = (event) =>
	event.includes(eventTypeTriggers.proceduralDeadline);

const isTimetableTypeOfEventActionable = (typeOfEvent) => {
	const typeOfEventLowerCase = typeOfEvent?.toLowerCase();

	return (
		isEventOfTypeDeadline(typeOfEventLowerCase) ||
		isEventOfTypeProceduralDeadline(typeOfEventLowerCase)
	);
};

const isTimetableDateOfEventPast = (dateOfEvent) => setTimeToEndOfDay(dateOfEvent) < getDateNow();

const hasTimetableDeadlineStarted = (dateTimeDeadlineStart) =>
	getDate(dateTimeDeadlineStart) <= getDateNow() || isNullSQLDate(new Date(dateTimeDeadlineStart));

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
