const config = require('../../config');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterComment,
				selectDeadline: { sessionIdPrimary, sessionIdSecondary, sessionIdTertiary },
				selectFile: { route: selectFileRoute },
				evidenceOrComment: { route: evidenceOrCommentRoute }
			}
		}
	}
} = require('../../routes/config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const pageData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrCommentRoute}`,
	id: enterComment.id,
	pageTitle: enterComment.name,
	title: enterComment.name
};

const getEnterComment = async (req, res) => {
	const hintText = 'FIND ME';

	pageData.hint = 'Comments on any submissions received by ' + hintText;
	pageData.optionTitle = 'CHANGE ME';

	res.render(enterComment.view, pageData);
};

const postEnterComment = async (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession || !examinationSession[sessionIdPrimary])
		return res.status(404).render('error/not-found');

	const selectedActiveDeadlineItem =
		examinationSession[sessionIdPrimary]?.[sessionIdTertiary]?.[
			examinationSession[sessionIdPrimary]?.[sessionIdSecondary]
		];

	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[enterComment.id] || Object.keys(errors).length > 0) {
		res.render(enterComment.view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const submissionType = selectedActiveDeadlineItem?.submissionType;

	if (submissionType === 'comment') {
		res.redirect('/examination/comment-has-personal-information-or-not');
	} else if (submissionType === 'both') {
		res.redirect(`${examinationDirectory}${selectFileRoute}`);
	} else {
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEnterComment,
	postEnterComment
};
