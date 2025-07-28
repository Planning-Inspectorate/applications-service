const { mapSubmissionItems } = require('./mapSubmissionItems');
const { hasMoreDeadlineItemsToSubmit } = require('./hasMoreDeadlineItemsToSubmit');
const { getBackLinkUrl } = require('./get-back-link-url');
const { getAddAnotherDeadlineOptions } = require('../config');
const {
	formatAddAnotherDeadlineItemOptions
} = require('./format-add-another-deadline-item-options');
const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem }
		}
	}
} = require('../../../../routes/config');

const getPageData = (i18n, session, query) => ({
	...mapSubmissionItems(i18n, session),
	backLinkUrl: getBackLinkUrl(query),
	id: addAnotherDeadlineItem.id,
	moreDeadlineItems: hasMoreDeadlineItemsToSubmit(i18n, session),
	options: formatAddAnotherDeadlineItemOptions(getAddAnotherDeadlineOptions(i18n))
});

module.exports = {
	getPageData
};
