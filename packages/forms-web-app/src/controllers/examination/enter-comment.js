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

const populatePageData = (hintText, comment = '') => ({
	...pageData,
	hint: 'Comments on any submissions received by ' + hintText,
	optionTitle: 'CHANGE ME',
	comment
});

const getEnterComment = async (req, res) => {
	const { session = {} } = req;
	const existingComment = session?.[examinationSessionStorage.name].comment || '';
	const localPageData = populatePageData('FIND ME', existingComment);
	res.render(enterComment.view, localPageData);
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
		const localPageData = populatePageData('FIND ME');
		res.render(enterComment.view, {
			...localPageData,
			errors,
			errorSummary
		});

		return;
	}

	examinationSession.comment = body[enterComment.id];

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
