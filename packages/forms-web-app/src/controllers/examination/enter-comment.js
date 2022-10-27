const config = require('../../config');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterComment,
				evidenceOrComment: { route: evidenceOrCommentRoute },
				personalInformationComment: { route: personalInformationCommentRoute },
				selectDeadline: { sessionIdPrimary, sessionIdSecondary, sessionIdTertiary },
				selectFile: { route: selectFileRoute }
			}
		}
	}
} = require('../../routes/config');
const { getSelectedDeadlineItem } = require('./utils/sessionHelpers');
const examinationSessionStorage = config?.sessionStorage?.examination;

const pageData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrCommentRoute}`,
	id: enterComment.id,
	pageTitle: enterComment.name,
	title: enterComment.name,
	captionTitle: 'Deadline item:'
};

const populatePageData = (hintText, comment = '') => ({
	...pageData,
	hint: 'Any further information requested by ' + hintText,
	comment
});

const getActiveDeadlineItem = (examinationSession) =>
	examinationSession[sessionIdPrimary]?.[sessionIdTertiary]?.[
		examinationSession[sessionIdPrimary]?.[sessionIdSecondary]
	];

const getEnterComment = async (req, res) => {
	const { session = {} } = req;
	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession || !examinationSession[sessionIdPrimary])
		return res.status(404).render('error/not-found');

	const selectedActiveDeadlineItem = getActiveDeadlineItem(examinationSession);
	const existingComment = session?.[examinationSessionStorage.name][enterComment.sessionId] || '';
	const setPageData = populatePageData(
		`${selectedActiveDeadlineItem?.submissionItem}`,
		existingComment
	);

	res.render(enterComment.view, {
		...setPageData,
		selectedDeadlineItemTitle: getSelectedDeadlineItem(session)
	});
};

const postEnterComment = async (req, res) => {
	try {
		const { session = {} } = req;
		const examinationSession = session?.[examinationSessionStorage.name];

		if (!examinationSession || !examinationSession[sessionIdPrimary])
			return res.status(404).render('error/not-found');

		const selectedActiveDeadlineItem = getActiveDeadlineItem(examinationSession);

		const { body = {} } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[enterComment.id] || Object.keys(errors).length > 0) {
			const setPageData = populatePageData(`${selectedActiveDeadlineItem?.submissionItem}`);
			return res.render(enterComment.view, {
				...setPageData,
				errors,
				errorSummary,
				selectedDeadlineItemTitle: getSelectedDeadlineItem(session)
			});
		}

		examinationSession[enterComment.sessionId] = body[enterComment.id];
		const submissionType = session.examination.submissionType;

		if (submissionType === 'comment') {
			res.redirect(`${examinationDirectory}${personalInformationCommentRoute}`);
		} else if (submissionType === 'both') {
			res.redirect(`${examinationDirectory}${selectFileRoute}`);
		} else {
			res.status(500).render('error/unhandled-exception');
		}
	} catch (error) {
		console.log('Error: ', error);
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEnterComment,
	postEnterComment
};
