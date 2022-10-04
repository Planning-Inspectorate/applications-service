const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			sessionId: examinationSessionId,
			pages: {
				checkYourAnswers: { route: checkYourAnswersRoute },
				enterComment: { route: enterCommentRoute },
				evidenceOrComment,
				selectDeadline,
				selectFile: { route: selectFileRoute }
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory}${selectDeadline.route}`,
	id: evidenceOrComment.id,
	options: [
		evidenceOrComment.options[1],
		evidenceOrComment.options[2],
		evidenceOrComment.options[3]
	],
	pageTitle: evidenceOrComment.name,
	title: evidenceOrComment.name
};

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

const getEvidenceOrComment = async (req, res) => {
	const selectedDeadlineItem = getSelectedDeadlineItem(req);

	if (!selectedDeadlineItem) return res.status(404).render('error/not-found');

	const setPageData = { ...pageData };

	const selectedEvidenceOrCommentValue = selectedDeadlineItem[evidenceOrComment.sessionId];

	if (selectedEvidenceOrCommentValue) {
		const evidenceOrCommentValues = { ...evidenceOrComment.options };

		const updatedEvidenceOrCommentValues = Object.keys(evidenceOrCommentValues).map(
			(evidenceOrCommentValue) => {
				const valueChecked =
					evidenceOrCommentValues[evidenceOrCommentValue].value === selectedEvidenceOrCommentValue;

				if (!valueChecked) return evidenceOrCommentValues[evidenceOrCommentValue];

				return {
					...evidenceOrCommentValues[evidenceOrCommentValue],
					checked: 'checked'
				};
			}
		);

		setPageData.options = updatedEvidenceOrCommentValues;
	}

	res.render(evidenceOrComment.view, setPageData);
};

const postEvidenceOrComment = async (req, res) => {
	const selectedDeadlineItem = getSelectedDeadlineItem(req);

	if (!selectedDeadlineItem) return res.status(404).render('error/not-found');

	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[evidenceOrComment.id] || Object.keys(errors).length > 0) {
		res.render(evidenceOrComment.view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const selectedEvidenceOrComment = body?.[evidenceOrComment.id];

	if (!selectedEvidenceOrComment) return res.status(404).render('error/not-found');

	const isValidValue = pageData.options.find((pageDataOption) => {
		return pageDataOption.value === selectedEvidenceOrComment;
	});

	if (!isValidValue) return res.status(404).render('error/not-found');

	selectedDeadlineItem[evidenceOrComment.sessionId] = selectedEvidenceOrComment;

	if (req?.query?.mode === 'edit') res.redirect(`${examinationDirectory + checkYourAnswersRoute}`);
	else if (evidenceOrComment.options[1].value === selectedEvidenceOrComment)
		res.redirect(`${examinationDirectory + enterCommentRoute}`);
	else if (evidenceOrComment.options[2].value === selectedEvidenceOrComment)
		res.redirect(`${examinationDirectory + selectFileRoute}`);
	else if (evidenceOrComment.options[3].value === selectedEvidenceOrComment)
		res.redirect(`${examinationDirectory + enterCommentRoute}`);
};

module.exports = {
	getEvidenceOrComment,
	postEvidenceOrComment
};
