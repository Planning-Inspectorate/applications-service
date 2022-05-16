const { VIEW } = require('../../lib/views');
const { getAppData } = require('../../services/application.service');
const { searchRepresentations } = require('../../lib/application-api-wrapper');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { getRepresentation } = require('../../services/representation.service');

exports.getRepresentations = async (req, res) => {
  const applicationResponse = await getAppData(req.params.case_ref);
  if (applicationResponse.resp_code === 200) {
    const representationsResponse = await searchRepresentations(
      applicationResponse.data.CaseReference,
      req.query.page
    );
    const paginationData = getPaginationData(representationsResponse.data);
    const pageOptions = calculatePageOptions(paginationData);
    res.render(VIEW.PROJECTS.REPRESENTATIONS, {
      projectName: applicationResponse.data.ProjectName,
      caseRef: applicationResponse.data.CaseReference,
      representations: representationsResponse.data.representations,
      paginationData,
      pageOptions,
    });
  }
};

exports.getRepresentation = async (req, res) => {
  const representation = await getRepresentation(req.params.id);
  console.log('-----------------representation------------------------------');
  console.dir(representation);
  // if (applicationResponse.resp_code === 200) {
  //   const representationsResponse = await searchRepresentations(
  //     applicationResponse.data.CaseReference,
  //     req.query.page
  //   );
  //   const paginationData = getPaginationData(representationsResponse.data);
  //   const pageOptions = calculatePageOptions(paginationData);
  res.render(
    VIEW.PROJECTS.REPRESENTATION
    //   {
    //   projectName: applicationResponse.data.ProjectName,
    //   caseRef: applicationResponse.data.CaseReference,
    //   representations: representationsResponse.data.representations,
    //   paginationData,
    //   pageOptions,
    // }
  );
  // }
};
