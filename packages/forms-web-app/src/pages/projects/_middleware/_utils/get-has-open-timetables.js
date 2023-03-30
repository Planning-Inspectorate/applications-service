const { getTimetables } = require('../../../../services/timetable.service');
const {
	getOpenEventDeadlineTimetables
} = require('../../../../utils/timetables/get-timetables-state');
const getHasOpenTimetables = async (case_ref) => {
	const {
		data: { timetables }
	} = await getTimetables(case_ref);
	const openEventDeadlineTimetables = getOpenEventDeadlineTimetables(timetables);
	return openEventDeadlineTimetables.length > 0;
};

module.exports = {
	getHasOpenTimetables
};
