const { marked } = require('marked');
const { formatDate } = require('../../../../../../utils/date-utils');
const {
	getEventDate,
	getEventDescription,
	getEventId,
	getEventTitle,
	getEventType
} = require('./getters');
const { getEventState } = require('./utils/get-event-state');
const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../../../../routes/config');

const eventViewModel = (event) => ({
	description: marked.parse(getEventDescription(event)),
	eventTitle: getEventTitle(event),
	id: getEventId(event),
	inputId: examinationTimetable.id,
	state: getEventState(event),
	title: `${formatDate(getEventDate(event))} - ${getEventTitle(event)}`,
	typeOfEvent: getEventType(event)
});

module.exports = { eventViewModel };
