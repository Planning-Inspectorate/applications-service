const { getExaminationSession } = require('../../_session/examination-session');
const { formatDate } = require('../../../../utils/date-utils');
const {
	removeTimetableItemFormatting
} = require('../../../../utils/timetables/format-timetable-items');
const {
	getOpenEventDeadlineTimetables
} = require('../../../../utils/timetables/get-timetables-state');

const getTitle = (title, dateOfEvent) => `${title} closes on ${formatDate(dateOfEvent)}`;

const getTimetableViewModel = (session, { uniqueId, title, description, dateOfEvent }) => ({
	checked: getExaminationSession(session).examinationTimetableId === uniqueId,
	items: removeTimetableItemFormatting(description),
	title: getTitle(title, dateOfEvent),
	value: uniqueId
});

const getOpenTimetablesViewModel = (session) =>
	getOpenEventDeadlineTimetables(getExaminationSession(session).timetables).map((timetable) =>
		getTimetableViewModel(session, timetable)
	);

module.exports = { getOpenTimetablesViewModel };
