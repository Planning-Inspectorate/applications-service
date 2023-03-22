const { getEventsAndDeadlineItems } = require('./getExaminationEvents');
const { setExaminationData } = require('../session-helpers');
const setupFromExamTimetable = async (session, caseRef) => {
	const { deadlineItems, selectedEvent } = await getEventsAndDeadlineItems(
		caseRef,
		session.examination.examinationTimetableId
	);

	session.examination.showDeadlineSelection = true;
	setExaminationData(session, caseRef, deadlineItems, selectedEvent);
};

module.exports = {
	setupFromExamTimetable
};
