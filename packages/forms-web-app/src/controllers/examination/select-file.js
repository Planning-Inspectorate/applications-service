const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				evidenceOrComment: { route: evidenceOrCommentRoute },
				selectFile
			}
		}
	}
} = require('../../routes/config');

const setData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrCommentRoute}`,
	id: selectFile.id,
	pageTitle: selectFile.name,
	title: selectFile.name
};

const getSelectFile = (req, res) => {
	res.render(selectFile.view, setData);
};

const postSelectFile = (req, res) => {
	res.render(selectFile.view, setData);
};

module.exports = {
	getSelectFile,
	postSelectFile
};
