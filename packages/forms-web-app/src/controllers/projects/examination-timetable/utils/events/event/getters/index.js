const { getEventDate } = require('./get-event-date');
const { getEventDeadlineStartTime } = require('./get-event-deadline-start-time');
const { getEventDescription } = require('./get-event-description');
const { getEventId } = require('./get-event-id');
const { getEventTitle } = require('./get-event-title');
const { getEventType } = require('./get-event-type');

module.exports = {
	getEventDate,
	getEventDeadlineStartTime,
	getEventDescription,
	getEventId,
	getEventTitle,
	getEventType
};
