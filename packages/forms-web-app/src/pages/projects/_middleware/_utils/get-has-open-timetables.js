const { getTimetables } = require('../../../../services/timetable.service');
const {
	getOpenEventDeadlineTimetables
} = require('../../../../utils/timetables/get-timetables-state');
const getHasOpenTimetables = async (case_ref) => {
	const { data } = await getTimetables(case_ref);
	let response = false;
	if (data && data.timetables) {
		const openEventDeadlineTimetables = getOpenEventDeadlineTimetables(data.timetables);
		response = openEventDeadlineTimetables.length > 0;
	}
	return response;
};

module.exports = {
	getHasOpenTimetables
};
