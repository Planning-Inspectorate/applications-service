const { getDeadlineItemStillToSubmit } = require('../../session/deadlineItems-session');
const { getRedirectUrl } = require('./get-redirect-url');

const hasMoreDeadlineItemsToSubmit = (session) => {
	const deadlineItemsToSubmit = getDeadlineItemStillToSubmit(session);
	const continueLink = getRedirectUrl('no');

	return {
		hasMoreDeadlineItemsToSubmit: deadlineItemsToSubmit.length !== 0,
		continueLink,
		message: 'You have submitted against all available deadline items'
	};
};

module.exports = {
	hasMoreDeadlineItemsToSubmit
};
