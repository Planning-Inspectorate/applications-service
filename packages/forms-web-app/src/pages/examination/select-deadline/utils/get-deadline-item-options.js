const { getDeadlineItemStillToSubmit } = require('../../_session/deadlineItems-session');
const { getActiveSubmissionItemId } = require('../../_session/submission-items-session');
const {
	getDeadlineItemViewModelByLocale
} = require('../../_utils/_view-models/deadline-item-view-model');
const { markActiveDeadlineItemAsChecked } = require('./markActiveDeadlineItemAsChecked');

const getDeadlineItemOptions = (i18n, session) => {
	const deadlineItemsToSubmit = JSON.parse(JSON.stringify(getDeadlineItemStillToSubmit(session)));
	const activeSubmissionItemId = getActiveSubmissionItemId(session);

	let deadlineItemOptions = deadlineItemsToSubmit.map((deadlineItemToSubmit) =>
		getDeadlineItemViewModelByLocale(i18n, deadlineItemToSubmit)
	);

	if (activeSubmissionItemId)
		deadlineItemOptions = markActiveDeadlineItemAsChecked(
			deadlineItemOptions,
			activeSubmissionItemId
		);

	return deadlineItemOptions;
};

module.exports = { getDeadlineItemOptions };
