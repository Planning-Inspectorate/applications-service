const { getTimetables } = require('../../../../../services/timetable.service');
const { formatDeadlineItems } = require('../deadlines/helpers');
const { findEventFromId } = require('../events/helpers');

const getEventsAndDeadlineItems = async (caseRef, examinationTimetableId) => {
	const { data: timetableData } = await getTimetables(caseRef);
	const eventWithDeadlineItems = findEventFromId(timetableData, examinationTimetableId);

	return {
		deadlineItems: formatDeadlineItems(eventWithDeadlineItems),
		selectedEvent: eventWithDeadlineItems
	};
};

module.exports = {
	getEventsAndDeadlineItems
};
