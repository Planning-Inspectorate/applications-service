const { getEvent } = require('./event/get-event');

const mapEventsToViewModel = (events, i18n) => events.map((event) => getEvent(event, i18n));

const eventsViewModel = (events, i18n) => ({
	past: {
		displayEvents: events.past.length > 0,
		events: mapEventsToViewModel(events.past, i18n),
		noEventsHtml: `<p>${i18n.t('examinationTimetable.noEvents')}</p>`,
		title: i18n.t('examinationTimetable.heading4')
	},
	upcoming: {
		displayEvents: events.upcoming.length > 0,
		events: mapEventsToViewModel(events.upcoming, i18n),
		noEventsHtml: `<p>${i18n.t('examinationTimetable.noEvents')}</p>`,
		title: i18n.t('examinationTimetable.heading3')
	}
});

module.exports = {
	eventsViewModel,
	mapEventsToViewModel
};
