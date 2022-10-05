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

const setData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrCommentRoute}`,
	id: enterComment.id,
	pageTitle: enterComment.name,
	title: enterComment.name
};

const getEnterComment = (req, res) => {
	res.render(enterComment.view, setData);
};

const postEnterComment = (req, res) => {
	res.render(enterComment.view, setData);
};

module.exports = {
	getEnterComment,
	postEnterComment
};
