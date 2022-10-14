const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			sessionId: examinationSessionId,
			pages: {
				evidenceOrComment,
				personalInformationCommentFiles: { route: personalInformationCommentFilesRoute },
				personalInformationFiles: { route: personalInformationFilesRoute },
				selectDeadline,
				selectFile
			}
		}
	}
} = require('../../routes/config');

const getSelectedDeadlineItem = (req) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionId];

	if (!examinationSession) return false;

	const selectedDeadlineItemActiveId =
		examinationSession[selectDeadline?.sessionIdPrimary]?.[selectDeadline?.sessionIdSecondary];
	const selectedDeadlineItems =
		examinationSession[selectDeadline?.sessionIdPrimary]?.[selectDeadline?.sessionIdTertiary];

	if (!selectedDeadlineItemActiveId || !selectedDeadlineItems) return false;

	const selectedDeadlineItem = selectedDeadlineItems[selectedDeadlineItemActiveId];

	if (!selectedDeadlineItem) return false;

	pageData.selectedDeadlineItemTitle = selectedDeadlineItem.submissionItem;

	return selectedDeadlineItem;
};

const pageData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrComment.route}`,
	id: selectFile.id,
	pageTitle: selectFile.name,
	title: selectFile.name
};

const getSelectFile = (req, res) => {
	res.render(selectFile.view, pageData);
};

const postSelectFile = (req, res) => {
	const selectedDeadlineItem = getSelectedDeadlineItem(req);

	const { body } = req;

	const selectFileValue = body[selectFile.id];

	if (selectFileValue === 'one-file') {
		selectedDeadlineItem[selectFile.sessionId] = [{}];
	} else if (selectFileValue === 'more-than-one-file') {
		selectedDeadlineItem[selectFile.sessionId] = [{}, {}];
	}

	if (selectedDeadlineItem[evidenceOrComment.sessionId] === evidenceOrComment.options[2].value) {
		return res.redirect(`${examinationDirectory}${personalInformationFilesRoute}`);
	} else if (
		selectedDeadlineItem[evidenceOrComment.sessionId] === evidenceOrComment.options[3].value
	) {
		return res.redirect(`${examinationDirectory}${personalInformationCommentFilesRoute}`);
	}
};

module.exports = {
	getSelectFile,
	postSelectFile
};
