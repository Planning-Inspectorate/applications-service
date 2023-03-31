const { getTimetables } = require('../../lib/application-api-wrapper');
const { formatTimetableItems } = require('./format-timetable-items');
const { findTimetableFromId } = require('./find-table-from-id');
const { addSelectedTimetableToSession } = require('./add-selected-timetable-to-session');

const getSelectedTimetableFromId = (timetables, timetablesId) => {
	const selectedTimetable = findTimetableFromId(timetables, timetablesId);
	return {
		selectedTimetable,
		selectedTimetableItems: formatTimetableItems(selectedTimetable)
	};
};

const getSelectedTimetable = async (caseRef, timetablesId) => {
	const {
		data: { timetables }
	} = await getTimetables(caseRef);

	return getSelectedTimetableFromId(timetables, timetablesId);
};

const getAndAddSelectedTimetableToSession = async (session, caseRef, timetableId) => {
	const { selectedTimetable, selectedTimetableItems } = await getSelectedTimetable(
		caseRef,
		timetableId
	);

	addSelectedTimetableToSession(session, selectedTimetableItems, selectedTimetable);
};

module.exports = {
	getSelectedTimetable,
	getSelectedTimetableFromId,
	getAndAddSelectedTimetableToSession
};
