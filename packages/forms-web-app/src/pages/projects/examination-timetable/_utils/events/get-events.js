const { getTimetables } = require('../../../../../lib/application-api-wrapper');
const { getProjectCaseRef } = require('../../../_utils/get-project-case-ref');
const { eventsViewModel } = require('./events-view-model');
const {
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables
} = require('../../../../../utils/timetables/get-timetables-state');
const { getPastTimetables } = require('../../../../../utils/timetables/get-timetables-state');

const getEvents = async (appData, i18n) => {
	const { data } = await getTimetables(getProjectCaseRef(appData));

	const timetables = data?.timetables || [];

	const sortedTimetables = {
		past: getPastTimetables(timetables),
		upcoming: getUpcomingTimetables(timetables)
	};

	const hasOpenTimetables = getOpenEventDeadlineTimetables(timetables).length > 0;

	return { ...eventsViewModel(sortedTimetables, i18n), hasOpenTimetables };
};

module.exports = { getEvents };
