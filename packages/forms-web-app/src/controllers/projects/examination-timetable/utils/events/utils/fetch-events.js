const { getTimetables } = require('../../../../../../services/timetable.service');

const fetchEvents = async (caseRef) => {
	const { data } = await getTimetables(caseRef);

	return data?.timetables || [];
};

module.exports = { fetchEvents };
