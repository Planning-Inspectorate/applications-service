const { getActiveSubmissionItemId } = require('../../session/submission-items-session');
const { getDeadlineItemStillToSubmit } = require('../../session/deadlineItems-session');
const { markActiveDeadlineItemAsChecked } = require('./markActiveDeadlineItemAsChecked');
const { getBackLinkUrl } = require('./get-back-link-url');

const {
	routesConfig: {
		examination: {
			pages: { selectDeadline }
		}
	}
} = require('../../../../routes/config');

const getPageData = (query, session) => {
	const pageData = {
		backLinkUrl: getBackLinkUrl(query),
		hintText:
			'Select the item you want to submit against. You can submit against another item later.',
		id: selectDeadline.id,
		pageTitle: selectDeadline.title,
		title: selectDeadline.title
	};

	const deadlineItemsToSubmit = getDeadlineItemStillToSubmit(session);
	pageData.options = deadlineItemsToSubmit;

	const activeSubmissionItemId = getActiveSubmissionItemId(session);
	if (activeSubmissionItemId)
		pageData.options = markActiveDeadlineItemAsChecked(
			deadlineItemsToSubmit,
			activeSubmissionItemId
		);

	return pageData;
};

module.exports = { getPageData };
