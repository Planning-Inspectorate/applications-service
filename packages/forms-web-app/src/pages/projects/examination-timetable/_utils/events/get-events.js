const { getTimetables } = require('../../../../../lib/application-api-wrapper');
const { getProjectCaseRef } = require('../../../_utils/get-project-case-ref');
const { eventsViewModel } = require('./events-view-model');
const {
	getUpcomingTimetables,
	getOpenEventDeadlineTimetables
} = require('../../../../../utils/timetables/get-timetables-state');
const { getPastTimetables } = require('../../../../../utils/timetables/get-timetables-state');
const { localiseDate } = require('../../../../../utils/date-utils');

const getEvents = async (appData, i18n) => {
	const { data } = await getTimetables(getProjectCaseRef(appData));

	const timetables = data?.timetables || [];

	//(APPLICS-1508)Due to timetable data coming from two sources (NI and CBOS; and NI dates being saved in local time, while CBOS dates are saved in UTC),
	//we will need to localise the CBOS dates here, where we can still differentiate between the two sources (by sourceSystem), before it is being passed deeper
	//TODO: When the migration is completed, we should remove this and probably only localise the dates in the views, and keep the date logic in UTC

	//go over the timetables and localise the CBOS dates
	const localisedTimetableData = timetables.map((timetable) => {
		if (timetable.sourceSystem === 'BACK_OFFICE') {
			return {
				...timetable,
				dateOfEvent: localiseDate(timetable.dateOfEvent),
				//some deadline start dates have null values, which the exam date logic happens to handle as it is being fed to js date object and turned into the default 1970-01-01T00:00:00.000
				//we will need to check if the date is null before localising it, but we should have a more graceful way of handling that
				dateTimeDeadlineStart: timetable.dateTimeDeadlineStart
					? localiseDate(timetable.dateTimeDeadlineStart)
					: null
			};
		}
		return timetable;
	});

	const sortedTimetables = {
		past: getPastTimetables(localisedTimetableData),
		upcoming: getUpcomingTimetables(localisedTimetableData)
	};

	const hasOpenTimetables = getOpenEventDeadlineTimetables(localisedTimetableData).length > 0;

	return { ...eventsViewModel(sortedTimetables, i18n), hasOpenTimetables };
};

module.exports = { getEvents };
