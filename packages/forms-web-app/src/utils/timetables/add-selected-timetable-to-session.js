const addSelectedTimetableToSession = (session, deadlineItems, { title, uniqueId }) =>
	(session.examination = {
		...session.examination,
		deadlineItems,
		title,
		examinationTimetableId: uniqueId
	});

module.exports = { addSelectedTimetableToSession };
