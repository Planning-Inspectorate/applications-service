const { getExaminationSession } = require('../../session/examination-session');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { addAnotherDeadlineItem, selectIfYouWantToDeleteData }
		}
	}
} = require('../../../../routes/config');

const mapSubmissionItems = (session) => {
	const examinationSession = getExaminationSession(session);

	const submissionItems = examinationSession.submissionItems;

	if (!submissionItems) throw new Error('No submission items in session');

	return {
		title:
			`You added ${submissionItems.length} deadline item` + (submissionItems.length > 1 ? 's' : ''),
		submissionItems: submissionItems.map((item) => ({
			submissionItem: item.submissionItem,
			change: {
				url: `${examinationDirectory}${addAnotherDeadlineItem.changeADeadlineItem.route}`,
				itemId: item.itemId
			},
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
