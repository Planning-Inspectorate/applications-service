const { VIEW } = require('../lib/views');
const { getAppData } = require('../services/application.service');

exports.getAllExaminationDocuments = async (req, res) => {
  const response = await getAppData(req.params.case_ref);
  if (response.resp_code === 200) {
    const appData = response.data;

    res.render(VIEW.ALL_EXAMINATION_DOCUMENTS, {
      projectName: appData.ProjectName,
      caseRef: appData.CaseReference,
    });
  }
};
