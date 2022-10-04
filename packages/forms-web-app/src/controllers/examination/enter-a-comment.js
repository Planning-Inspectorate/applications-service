const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterAComment,
				selectDeadline: { route: selectDeadlineRoute }
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: examinationDirectory + selectDeadlineRoute,
	id: enterAComment.id,
	pageTitle: enterAComment.name,
	title: enterAComment.name
};

const getEnterAComment = async (req, res) => {
	const hintText = 'FIND ME';
	const optionalPageData = {
		hint: 'Comments on any submissions received by ' + hintText,
		optionTitle: 'CHANGE ME'
	};

	res.render(enterAComment.view, { ...pageData, ...optionalPageData });
};

const postEnterAComment = async (req, res) => {
	res.render(enterAComment.view, pageData);
};

module.exports = {
	getEnterAComment,
	postEnterAComment
};
