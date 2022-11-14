const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { addAnotherDeadlineItem, checkSubmissionItem }
		}
	}
} = require('../../../../routes/config');
const { mapSubmissionItems } = require('./mapSubmissionItems');
const { hasMoreDeadlineItemsToSubmit } = require('./hasMoreDeadlineItemsToSubmit');

const pageData = {
	backLinkUrl: `${examinationDirectory}${checkSubmissionItem.route}`,
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
	title: addAnotherDeadlineItem.title
};

const getPageData = (session) => {
	const mappedSubmissionItems = mapSubmissionItems(session);
	const moreDeadlineItems = hasMoreDeadlineItemsToSubmit(session);
	return {
		...pageData,
		...mappedSubmissionItems,
		moreDeadlineItems
	};
};

module.exports = {
	getPageData
};
