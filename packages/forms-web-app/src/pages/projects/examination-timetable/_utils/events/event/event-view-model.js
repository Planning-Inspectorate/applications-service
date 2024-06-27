const { marked } = require('marked');
const { formatDate } = require('../../../../../../utils/date-utils');
const { getEventState } = require('./utils/get-event-state');
const { isLangWelsh } = require('../../../../../_utils/is-lang-welsh');
const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../../../../routes/config');

const getEventTitle = (event, i18n) =>
	isLangWelsh(i18n.language) && event.titleWelsh ? event.titleWelsh : event.title;
const getEventDescription = (event, i18n) =>
	isLangWelsh(i18n.language) && event.descriptionWelsh ? event.descriptionWelsh : event.description;

const eventViewModel = (event, i18n) => ({
	description: marked.parse(getEventDescription(event, i18n)),
	eventTitle: getEventTitle(event, i18n),
	id: event.uniqueId,
	inputId: examinationTimetable.id,
	state: getEventState(event, i18n),
	title: `${formatDate(event.dateOfEvent, i18n.language)} - ${getEventTitle(event, i18n)}`,
	typeOfEvent: event.typeOfEvent
});

module.exports = { eventViewModel };
