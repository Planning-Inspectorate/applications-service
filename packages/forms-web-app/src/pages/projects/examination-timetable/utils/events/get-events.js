const { getDate, getDateNow } = require('../../../../../utils/date-utils');
const { getProjectCaseRef } = require('../../../utils/get-project-case-ref');
const {
	getProjectDateOfNonAcceptance
} = require('../../../utils/get-project-date-of-non-acceptance');
const { fetchEvents } = require('./utils/fetch-events');
const { sortEvents } = require('./utils/sort-events');
const { eventsViewModel } = require('./events-view-model');

const areEventsEligibleForDisplay = (appData) => {
	const projectDateOfNonAcceptance = getProjectDateOfNonAcceptance(appData);

	return projectDateOfNonAcceptance && getDateNow() >= getDate(projectDateOfNonAcceptance);
};

const getEvents = async (appData) => {
	const events = await fetchEvents(getProjectCaseRef(appData));
	const sortedEvents = sortEvents(events);
	const available = areEventsEligibleForDisplay(appData);

	return eventsViewModel(sortedEvents, available);
};

module.exports = { getEvents };
