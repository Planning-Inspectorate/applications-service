const { getExaminationSession } = require('../../session/examination-session');
const { filterSubmissionItems } = require('./filter-submission-items');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { checkSubmissionItem, selectIfYouWantToDeleteData, selectDeadline }
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
			selectDeadlineURL: `${examinationDirectory}${selectDeadline.route}`
		},
		title:
			`You added ${filterdSubmissionItems.length} deadline item` +
			(filterdSubmissionItems.length > 1 ? 's' : ''),
		submissionItems: filterdSubmissionItems.map((item) => ({
			submissionItem: item.submissionItem,
			changeUrl: `${examinationDirectory}${checkSubmissionItem.route}`,
			remove: {
				url: `${examinationDirectory}${selectIfYouWantToDeleteData.markDeadlineItemForDelete.route}`,
				itemId: item.itemId
			}
		}))
	};
};

module.exports = {
	mapSubmissionItems
};
