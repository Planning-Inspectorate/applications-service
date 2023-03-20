const { getExaminationSession } = require('../../_session/examination-session');
const { filterSubmissionItems } = require('./filter-submission-items');
const {
	routesConfig: {
		examination: {
			pages: { addAnotherDeadlineItem, selectIfYouWantToDeleteData, selectDeadline }
		}
	}
} = require('../../../../routes/config');

const mapSubmissionItems = (session) => {
	const examinationSession = getExaminationSession(session);

	const submissionItems = examinationSession.submissionItems;

	if (!submissionItems) throw new Error('No submission items in session');

	const filterdSubmissionItems = filterSubmissionItems(submissionItems);

	return {
		hasNoSubmissionItems: filterdSubmissionItems.length === 0,
		noDeadlineItems: {
			title: 'You have not added a deadline item',
			selectDeadlineURL: `${selectDeadline.route}`
		},
		title:
			`You added ${filterdSubmissionItems.length} deadline item` +
			(filterdSubmissionItems.length > 1 ? 's' : ''),
		submissionItems: filterdSubmissionItems.map((item) => ({
			submissionItem: item.submissionItem,
			change: {
				url: `${addAnotherDeadlineItem.changeADeadlineItem.route}`,
				itemId: item.itemId
			},
			remove: {
				url: `${selectIfYouWantToDeleteData.markDeadlineItemForDelete.route}`,
				itemId: item.itemId
			}
		}))
	};
};

module.exports = {
	mapSubmissionItems
};
