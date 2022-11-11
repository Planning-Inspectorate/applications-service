const { VIEW } = require('../../lib/views');

exports.getAllExaminationDocuments = (req, res) => {
	res.render(VIEW.PROJECTS.ALL_EXAMINATION_DOCUMENTS, {
		caseRef: req.session.caseRef,
		projectName: req.session.projectName
	});
};
