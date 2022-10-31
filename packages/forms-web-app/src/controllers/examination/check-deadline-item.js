const { getActiveSubmissionItem } = require('./session/submission-items-session');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				checkDeadlineItem,
				enterComment,
				evidenceOrComment,
				personalInformation,
				personalInformationComment: { route: personalInformationCommentRoute },
				personalInformationCommentFiles: { route: personalInformationCommentFilesRoute },
				personalInformationFiles: { route: personalInformationFilesRoute },
				selectDeadline
			}
		}
	}
} = require('../../routes/config');

const setSummaryListItem = (keyText, valueText, actionItemHref) => {
	return {
		key: {
			text: keyText
		},
		value: {
			text: valueText
		},
		actions: {
			items: [
				{
					href: actionItemHref,
					text: 'Change',
					visuallyHiddenText: keyText
				}
			]
		}
	};
};

const pageData = {
	id: checkDeadlineItem.id,
	pageTitle: checkDeadlineItem.name,
	summaryList: [],
	title: checkDeadlineItem.name
};

const addPageData = (route) => {
	pageData.backLinkUrl = `${examinationDirectory}${route}`;
};

const setPageData = (activeDeadlineItem) => {
	const submissionType = activeDeadlineItem?.[evidenceOrComment.sessionId];

	if (!submissionType) return false;

	switch (submissionType) {
		case evidenceOrComment.options[1].value:
			addPageData(personalInformationCommentRoute);

			break;
		case evidenceOrComment.options[2].value:
			addPageData(personalInformationFilesRoute);

			break;
		case evidenceOrComment.options[3].value:
			addPageData(personalInformationCommentFilesRoute);

			break;
		default:
			return false;
	}

	return true;
};

const getCheckDeadlineItem = (req, res) => {
	const activeDeadlineItem = getActiveSubmissionItem(req.session);

	if (!activeDeadlineItem) return res.status(500).render('error/unhandled-exception');

	console.log('activeDeadlineItem::: ', activeDeadlineItem);

	const hasSetPageData = setPageData(activeDeadlineItem);

	console.log('req.session.examination::: ', req.session.examination);

	if (!hasSetPageData) return res.status(500).render('error/unhandled-exception');

	pageData.summaryList = [
		setSummaryListItem(
			selectDeadline.name,
			activeDeadlineItem.submissionItem,
			`${examinationDirectory}${selectDeadline.route}`
		),
		setSummaryListItem(
			evidenceOrComment.name,
			activeDeadlineItem[evidenceOrComment.sessionId],
			`${examinationDirectory}${evidenceOrComment.route}`
		),
		setSummaryListItem(
			enterComment.name,
			activeDeadlineItem[enterComment.sessionId],
			`${examinationDirectory}${enterComment.route}`
		),
		setSummaryListItem(
			personalInformation.name,
			activeDeadlineItem[personalInformation.sessionId],
			`${examinationDirectory}${personalInformation.route}`
		)
	];

	res.render(checkDeadlineItem.view, pageData);
};

const postCheckDeadlineItem = (req, res) => {
	res.render(checkDeadlineItem.view, pageData);
};

module.exports = {
	getCheckDeadlineItem,
	postCheckDeadlineItem
};
