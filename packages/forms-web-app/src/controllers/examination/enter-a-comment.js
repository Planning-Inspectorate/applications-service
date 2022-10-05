const config = require('../../config');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterAComment,
				evidenceOrComment: { route: evidenceOrCommentRoute }
			}
		}
	}
} = require('../../routes/config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const pageData = {
	backLinkUrl: examinationDirectory + evidenceOrCommentRoute,
	id: enterAComment.id,
	pageTitle: enterAComment.name,
	title: enterAComment.name
};

const getEnterAComment = async (req, res) => {
	const hintText = 'FIND ME';

	pageData.hint = 'Comments on any submissions received by ' + hintText;
	pageData.optionTitle = 'CHANGE ME';

	res.render(enterAComment.view, pageData);
};

const postEnterAComment = async (req, res) => {
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
	getEnterAComment,
	postEnterAComment
};
