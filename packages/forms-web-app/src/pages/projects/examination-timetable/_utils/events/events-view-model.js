const { getEvent } = require('./event/get-event');

const mapEventsToViewModel = (events) => events.map((event) => getEvent(event));

const eventsViewModel = (events) => ({
	past: {
		displayEvents: events.past.length > 0,
		events: mapEventsToViewModel(events.past),
		noEventsHtml: '<p>There are no deadlines and events</p>',
		title: 'Past deadlines and events'
	},
	upcoming: {
		displayEvents: events.upcoming.length > 0,
		events: mapEventsToViewModel(events.upcoming),
		noEventsHtml: '<p>There are no deadlines and events</p>',
		title: 'Upcoming deadlines and events'
	}
});

module.exports = {
	eventsViewModel,
	mapEventsToViewModel
};
