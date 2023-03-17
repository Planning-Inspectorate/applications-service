const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem }
		}
	}
} = require('../../../../routes/config');
const { mapSubmissionItems } = require('./mapSubmissionItems');
const { hasMoreDeadlineItemsToSubmit } = require('./hasMoreDeadlineItemsToSubmit');
const { getBackLinkUrl } = require('./get-back-link-url');

const getPageData = (session, query) => {
	const mappedSubmissionItems = mapSubmissionItems(session);
	const moreDeadlineItems = hasMoreDeadlineItemsToSubmit(session);

	return {
		...mappedSubmissionItems,
		moreDeadlineItems,
		hintHtml: 'Do you need to add another deadline item?',
		id: addAnotherDeadlineItem.id,
		options: [
			{
				value: 'yes',
				text: 'Yes'
			},
			{
				value: 'no',
				text: 'no'
			}
		],
		name: addAnotherDeadlineItem.name,
		pageTitle: addAnotherDeadlineItem.pageTitle,
		title: addAnotherDeadlineItem.title,
		backLinkUrl: getBackLinkUrl(query)
	};
};

module.exports = {
	getPageData
};
