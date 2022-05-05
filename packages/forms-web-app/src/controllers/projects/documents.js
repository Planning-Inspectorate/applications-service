const logger = require('../../lib/logger');
const { Status: projectStageNames } = require('../../utils/status');
const { generatePagination } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { searchDocumentsV2 } = require('../../services/document.service');

function getPageData(doc) {
  const item = {};
  item.totalItems = doc.totalItems;
  item.itemsPerPage = doc.itemsPerPage;
  item.totalPages = doc.totalPages;
  item.currentPage = parseInt(doc.currentPage, 10);
  item.fromRange = doc.itemsPerPage * (doc.currentPage - 1) + 1;
  item.toRange =
    item.currentPage === doc.totalPages ? doc.totalItems : doc.itemsPerPage * doc.currentPage;
  return item;
}

function renderData(req, res, searchTerm, params, response) {
  const { caseRef } = params;
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      projectName,
      caseRef,
      searchTerm,
    });
  } else {
    let queryUrl = '';
    if (params.searchTerm !== '') {
      queryUrl = `?searchTerm=${params.searchTerm}`;
    }
    const respData = response.data;
    const { documents, filters } = respData;
    const { stageFilters, typeFilters } = filters;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const pageData = getPageData(respData);
    const paginationData = generatePagination(pageData.currentPage, pageData.totalPages);

    var customStageFilters = [];

    stageFilters.forEach(function (stage) {
      customStageFilters.push({
        text: `${projectStageNames[stage.name]} (${stage.count})`,
        value: stage.name,
      });
    }, Object.create(null));

    res.render(VIEW.PROJECTS.DOCUMENTS, {
      documents,
      projectName,
      caseRef,
      pageData,
      paginationData,
      searchTerm,
      queryUrl,
      customStageFilters,
    });
  }
}

exports.getAboutTheApplication = async (req, res) => {
  const queryArray = req.url.split('?');
  const query = queryArray.length > 1 ? queryArray[1] : '';
  const params = {
    caseRef: req.params.case_ref,
    page: req.params.page,
  };
  const { searchTerm } = req.query;
  const response = await searchDocumentsV2(params, query);
  renderData(req, res, searchTerm, params, response);
};
