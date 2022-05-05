const logger = require('../../lib/logger');
const { getPaginationData, calculatePageOptions } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { searchDocumentsV2 } = require('../../services/document.service');

function renderData(req, res, params, response) {
  const { caseRef, searchTerm } = params;
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      projectName,
      caseRef,
    });
  } else {
    let queryUrl = '';
    if (params.searchTerm) {
      queryUrl = `?searchTerm=${params.searchTerm}`;
    }
    const respData = response.data;
    const { documents } = respData;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const paginationData = getPaginationData(respData);
    const pageOptions = calculatePageOptions(paginationData);
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      documents,
      projectName,
      caseRef,
      paginationData,
      pageOptions,
      searchTerm,
      queryUrl,
    });
  }
}

exports.getAboutTheApplication = async (req, res) => {
  const params = {
    ...{ caseRef: req.params.case_ref },
    ...{ page: req.params.page },
    ...(req.query.searchTerm && { searchTerm: req.query.searchTerm }),
  };
  const response = await searchDocumentsV2(params);
  renderData(req, res, params, response);
};
