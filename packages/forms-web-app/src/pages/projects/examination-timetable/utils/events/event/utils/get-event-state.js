const {
	isTimetableDateOfEventPast
} = require('../../../../../../../utils/timetables/check-timetable-state');
const {
	isTimetableTypeOfEventDeadlineOpen
} = require('../../../../../../../utils/timetables/check-timetable-state');

const eventStateTagMapper = (text, classes) => ({
	text,
	classes
});

const getEventState = (event) => {
	let eventStateTag = null;

	const doesDescriptionDeadlineItems = event.description.includes('* ');

	const isSubmissionOpen =
		isTimetableTypeOfEventDeadlineOpen(
			event.typeOfEvent,
			event.dateOfEvent,
			event.dateTimeDeadlineStart
		) && doesDescriptionDeadlineItems;

	if (isSubmissionOpen) eventStateTag = eventStateTagMapper('Open', 'govuk-tag govuk-tag--blue');
	else if (isTimetableDateOfEventPast(event.dateOfEvent))
		eventStateTag = eventStateTagMapper('Closed', 'govuk-tag');

	return {
		isSubmissionOpen,
		tag: eventStateTag
	};
};

module.exports = { getEventState };
