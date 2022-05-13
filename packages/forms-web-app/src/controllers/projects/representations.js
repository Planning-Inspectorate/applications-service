const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchRepresentations } = require('../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');

exports.getRepresentations = async (req, res) => {
  const { searchTerm } = req.query;
  const applicationResponse = await getAppData(req.params.case_ref);
  const params = {
    applicationId: req.params.case_ref,
    page: '1',
    ...req.query,
  };

  if (applicationResponse.resp_code === 200) {
    const representationsResponse = await searchRepresentations(params);
    if (representationsResponse.resp_code === 404) {
      res.render(VIEW.PROJECTS.REPRESENTATIONS, {
        projectName: applicationResponse.data.ProjectName,
        caseRef: applicationResponse.data.CaseReference,
        searchTerm,
      });
    } else {
      const paginationData = getPaginationData(representationsResponse.data);
      const pageOptions = calculatePageOptions(paginationData);
      res.render(VIEW.PROJECTS.REPRESENTATIONS, {
        projectName: applicationResponse.data.ProjectName,
        caseRef: applicationResponse.data.CaseReference,
        representations: representationsResponse.data.representations,
        paginationData,
        pageOptions,
        searchTerm,
      });
    }
  }
};
