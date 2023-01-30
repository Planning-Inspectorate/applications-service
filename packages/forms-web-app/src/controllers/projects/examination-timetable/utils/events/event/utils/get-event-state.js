const { isEventDeadlineSubmissionOpen, isPastEventTypeDeadline } = require('../helpers');

const eventStateTagMapper = (text, classes) => ({
	text,
	classes
});

const getEventState = (event) => {
	let eventStateTag = null;

	const isSubmissionOpen = isEventDeadlineSubmissionOpen(event);

	if (isSubmissionOpen) eventStateTag = eventStateTagMapper('Open', 'govuk-tag govuk-tag--blue');
	else if (isPastEventTypeDeadline(event))
		eventStateTag = eventStateTagMapper('Closed', 'govuk-tag');

	return {
		isSubmissionOpen,
		tag: eventStateTag
	};
};

module.exports = { getEventState };
