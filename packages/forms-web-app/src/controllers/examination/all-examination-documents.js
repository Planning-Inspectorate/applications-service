const { VIEW } = require('../../lib/views');

exports.getAllExaminationDocuments = async (req, res) => {
  res.render(VIEW.EXAMINATION.ALL_EXAMINATION_DOCUMENTS, {
    caseRef: req.session.caseRef,
    projectName: req.session.projectName,
  });
};
