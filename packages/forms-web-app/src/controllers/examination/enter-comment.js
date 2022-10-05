const config = require('../../config');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterComment,
				selectDeadline,
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

	const selectedActiveDeadlineItem =
		examinationSession[selectDeadline?.sessionIdPrimary]?.[selectDeadline?.sessionIdTertiary]?.[
			examinationSession[selectDeadline?.sessionIdPrimary]?.[selectDeadline?.sessionIdSecondary]
		];

	if (!examinationSession || !selectedActiveDeadlineItem)
		return res.status(404).render('error/not-found');

	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;

	const sessionCurrentView = req.session?.currentView;
	const { id, view } = sessionCurrentView;

	if (errors[id] || Object.keys(errors).length > 0) {
		res.render(view, {
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
