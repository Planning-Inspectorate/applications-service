const {
	isNullSQLDate,
	getDateNow,
	setTimeToStartOfDay
} = require('../../../../../../utils/date-utils');
const { getEventDeadlineStartTime, getEventType } = require('../getters');
const { isPastEvent } = require('./is-past-event');

const isEventTypeDeadline = (event) => getEventType(event) === 'Deadline';

const isEventDeadlineUpcoming = (event) => isEventTypeDeadline(event) && !isPastEvent(event);

const eventDeadlineHasStarted = (event) => {
	const eventDeadlineStartTime = getEventDeadlineStartTime(event);
	return (
		setTimeToStartOfDay(eventDeadlineStartTime) <= getDateNow() ||
		isNullSQLDate(new Date(eventDeadlineStartTime))
	);
};

const isEventDeadlineSubmissionOpen = (event) =>
	isEventDeadlineUpcoming(event) && eventDeadlineHasStarted(event);

module.exports = { isEventDeadlineSubmissionOpen };
