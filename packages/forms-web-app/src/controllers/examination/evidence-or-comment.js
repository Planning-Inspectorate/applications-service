const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				evidenceOrComment,
				selectDeadline: { route: selectDeadlineRoute }
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: examinationDirectory + selectDeadlineRoute,
	id: evidenceOrComment.id,
	pageTitle: evidenceOrComment.name,
	title: evidenceOrComment.name
};

const getEvidenceOrComment = async (req, res) => {
	res.render(evidenceOrComment.view, pageData);
};

const postEvidenceOrComment = async (req, res) => {
	res.render(evidenceOrComment.view, pageData);
};

module.exports = {
	getEvidenceOrComment,
	postEvidenceOrComment
};
