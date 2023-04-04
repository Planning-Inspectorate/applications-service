const { getTimetables } = require('../../../../../lib/application-api-wrapper');
const { getDate, getDateNow } = require('../../../../../utils/date-utils');
const { getProjectCaseRef } = require('../../../utils/get-project-case-ref');
const {
	getProjectDateOfNonAcceptance
} = require('../../../utils/get-project-date-of-non-acceptance');
const { eventsViewModel } = require('./events-view-model');
const { getUpcomingTimetables } = require('../../../../../utils/timetables/get-timetables-state');
const { getPastTimetables } = require('../../../../../utils/timetables/get-timetables-state');

const areEventsEligibleForDisplay = (projectDateOfNonAcceptance) =>
	projectDateOfNonAcceptance && getDateNow() >= getDate(projectDateOfNonAcceptance);

const getEvents = async (appData) => {
	const {
		data: { timetables }
	} = await getTimetables(getProjectCaseRef(appData));
	const sortedTimetables = {
		past: getPastTimetables(timetables),
		upcoming: getUpcomingTimetables(timetables)
	};
	const projectDateOfNonAcceptance = getProjectDateOfNonAcceptance(appData);
	const available = areEventsEligibleForDisplay(projectDateOfNonAcceptance);

	return eventsViewModel(sortedTimetables, available);
};

module.exports = { getEvents, areEventsEligibleForDisplay };
