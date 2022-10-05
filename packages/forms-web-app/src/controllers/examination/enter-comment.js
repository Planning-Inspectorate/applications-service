const config = require('../../config');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterComment,
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

	if (!examinationSession) return res.status(404).render('error/not-found');

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

	if ('comments only' === false) {
		res.redirect('/examination/comment-has-personal-information-or-not');
	} else if ('both' === false) {
		res.redirect('/examination/select-a-file');
	} else {
		res.status(500).send('error');
	}
};

module.exports = {
	getEnterComment,
	postEnterComment
};
