const { getDeadlineItemStillToSubmit } = require('../../_session/deadlineItems-session');
const { getRedirectUrl } = require('./get-redirect-url');

const hasMoreDeadlineItemsToSubmit = (i18n, session) => {
	const deadlineItemsToSubmit = getDeadlineItemStillToSubmit(session);
	const continueLink = getRedirectUrl('no');

	return {
		hasMoreDeadlineItemsToSubmit: deadlineItemsToSubmit.length !== 0,
		continueLink,
		message: i18n.t('examination.addAnotherDeadlineItem.moreDeadlineItems.message1')
	};
};

module.exports = {
	hasMoreDeadlineItemsToSubmit
};
