const logger = require('../../lib/logger');
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
    if (params.searchTerm !== '') {
      queryUrl = `?searchTerm=${params.searchTerm}`;
    }
    const respData = response.data;
    const { documents } = respData;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const pageData = getPageData(respData);
    const paginationData = generatePagination(pageData.currentPage, pageData.totalPages);
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      documents,
      projectName,
      caseRef,
      pageData,
      paginationData,
      searchTerm,
      queryUrl,
    });
  }
}

exports.getAboutTheApplication = async (req, res) => {
  const { searchTerm } = req.query;
  req.session.searchTerm = searchTerm;
  const params = {
    caseRef: req.params.case_ref,
    pageNo: req.params.page,
    searchTerm: req.session.searchTerm,
  };
  const response = await searchDocumentsV2(params);
  renderData(req, res, params, response);
};
