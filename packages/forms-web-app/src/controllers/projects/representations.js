const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchRepresentations } = require('../../lib/application-api-wrapper');

exports.getRepresentations = async (req, res) => {
  const applicationResponse = await getAppData(req.params.case_ref);
  if (applicationResponse.resp_code === 200) {
    const representationsResponse = await searchRepresentations(
      applicationResponse.data.CaseReference
    );
    res.render(VIEW.PROJECTS.REPRESENTATIONS, {
      projectName: applicationResponse.data.ProjectName,
      caseRef: applicationResponse.data.CaseReference,
      representations: representationsResponse.data,
    });
  }
};
