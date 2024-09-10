const {
	isTimetableDateOfEventPast,
	isTimetableTypeOfEventDeadlineOpen,
	hasDeadlineItemsList
} = require('../../../../../../../utils/timetables/check-timetable-state');

const eventStateTagMapper = (text, classes) => ({
	text,
	classes
});

const getEventState = (event, i18n) => {
	let eventStateTag = null;

	const isSubmissionOpen =
		isTimetableTypeOfEventDeadlineOpen(
			event.typeOfEvent,
			event.dateOfEvent,
			event.dateTimeDeadlineStart
		) && hasDeadlineItemsList(event.description);

	if (isSubmissionOpen)
		eventStateTag = eventStateTagMapper(
			i18n.t('examinationTimetable.tagTextOpen'),
			'govuk-tag govuk-tag--blue'
		);
	else if (isTimetableDateOfEventPast(event.dateOfEvent)) {
		eventStateTag = eventStateTagMapper(i18n.t('examinationTimetable.tagTextClosed'), '');
	}

	return {
		isSubmissionOpen,
		tag: eventStateTag
	};
};

module.exports = { getEventState };
