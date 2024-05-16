const { marked } = require('marked');
const { formatDate } = require('../../../../../../utils/date-utils');
const { getEventState } = require('./utils/get-event-state');
const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../../../../routes/config');

const eventViewModel = (event, i18n) => ({
	description: marked.parse(event.description),
	eventTitle: event.title,
	id: event.uniqueId,
	inputId: examinationTimetable.id,
	state: getEventState(event, i18n),
	title: `${formatDate(event.dateOfEvent)} - ${event.title}`,
	typeOfEvent: event.typeOfEvent
});

module.exports = { eventViewModel };
