const { getExaminationSession } = require('../../session/examination-session');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { checkDeadlineItem }
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
			changeUrl: `${examinationDirectory}${checkDeadlineItem.route}`,
			removeUrl: '/examination/select-if-want-to-delete-data'
		}))
	};
};

module.exports = {
	mapSubmissionItems
};
