const { isEventDeadlineSubmissionOpen } = require('./get-event-deadline-submission-state');
const { isPastEvent } = require('./is-past-event');

module.exports = {
	isEventDeadlineSubmissionOpen,
	isPastEvent
};
