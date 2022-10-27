const config = require('../../../routes/config');

const getSelectedDeadlineItemFromSession = (examinationSession) => {
	const deadlineItems = examinationSession.selectedDeadlineItems;
	const activeId = deadlineItems.activeId;
	if (!activeId) throw new Error('No active id');
	return deadlineItems.items[activeId];
};

const getSelectedDeadlineFilesLength = (session) => {
	const examinationSession = session?.examination;
	const items = examinationSession.selectedDeadlineItems.items;
	let length = 0;

	for (let key in items) {
		if (items[key].files) length += items[key].files.length;
	}

	return length;
};

const getSelectedDeadlineItem = (session) => {
	const {
		routesConfig: {
			examination: {
				sessionId: examinationSessionId,
				pages: { selectDeadline }
			}
		}
	} = config;

	const examinationSession = session?.[examinationSessionId];
	if (!examinationSession) return false;

	const selectedDeadlineItemActiveId =
		examinationSession[selectDeadline?.sessionIdPrimary]?.[selectDeadline?.sessionIdSecondary];
	const selectedDeadlineItems =
		examinationSession[selectDeadline?.sessionIdPrimary]?.[selectDeadline?.sessionIdTertiary];
	if (!selectedDeadlineItemActiveId || !selectedDeadlineItems) return false;
	const selectedDeadlineItem = selectedDeadlineItems[selectedDeadlineItemActiveId];
	if (!selectedDeadlineItem) return false;

	return selectedDeadlineItem.submissionItem;
};

module.exports = {
	getSelectedDeadlineItem,
	getSelectedDeadlineItemFromSession,
	getSelectedDeadlineFilesLength
};
