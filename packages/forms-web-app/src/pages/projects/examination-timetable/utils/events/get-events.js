const { getTimetables } = require('../../../../../lib/application-api-wrapper');
const { getDate, getDateNow } = require('../../../../../utils/date-utils');
const { getProjectCaseRef } = require('../../../utils/get-project-case-ref');
const {
	getProjectDateOfNonAcceptance
} = require('../../../utils/get-project-date-of-non-acceptance');
const { eventsViewModel } = require('./events-view-model');
const { getUpcomingTimetables } = require('../../../../../utils/timetables/get-timetables-state');
const { getPastTimetables } = require('../../../../../utils/timetables/get-timetables-state');

const areEventsEligibleForDisplay = (appData) => {
	const projectDateOfNonAcceptance = getProjectDateOfNonAcceptance(appData);

	return projectDateOfNonAcceptance && getDateNow() >= getDate(projectDateOfNonAcceptance);
};

const getEvents = async (appData) => {
	let timetables = [];
	const { data } = await getTimetables(getProjectCaseRef(appData));
	if (data && data.timetables) timetables = data.timetables;
	const sortedTimetables = {
		past: getPastTimetables(timetables),
		upcoming: getUpcomingTimetables(timetables)
	};
	const available = areEventsEligibleForDisplay(appData);

	return eventsViewModel(sortedTimetables, available);
};

module.exports = { getEvents };
