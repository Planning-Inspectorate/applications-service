const { VIEW } = require('../../../lib/views');

const getProjectExaminationDocuments = async (req, res) => {
	res.render(VIEW.PROJECTS.PROJECT.EXAMINATION_DOCUMENTS, {
		caseRef: req.session.caseRef,
		projectName: req.session.projectName
	});
};

module.exports = {
	getProjectExaminationDocuments
};
