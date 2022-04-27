const logger = require('../../lib/logger');
const { generatePagination } = require('../../lib/pagination');
const { VIEW } = require('../../lib/views');
const { searchDocumentsV2 } = require('../../services/document.service');

function getPageData(doc) {
  const item = {};
  item.totalItems = doc.totalItems;
  item.itemsPerPage = doc.itemsPerPage;
  item.totalPages = doc.totalPages;
  item.currentPage = doc.currentPage;
  item.fromRange = doc.itemsPerPage * (doc.currentPage - 1) + 1;
  item.toRange =
    doc.currentPage === doc.totalPages ? doc.totalItems : doc.itemsPerPage * doc.currentPage;
  return item;
}

function renderData(req, res, params, response) {
  const { caseRef } = params;
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      projectName,
      caseRef,
    });
  } else {
    const respData = response.data;
    const { documents } = respData;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const pageData = getPageData(respData);
    const paginationData = generatePagination(pageData.currentPage, pageData.totalPages);
    console.log(documents);
    res.render(VIEW.PROJECTS.DOCUMENTS, {
      documents,
      projectName,
      caseRef,
      pageData,
      paginationData,
    });
  }
}

exports.getAboutTheApplication = async (req, res) => {
  const params = {
    caseRef: req.params.case_ref,
    pageNumber: 1,
  };
  const response = await searchDocumentsV2(params);
  renderData(req, res, params, response);
};
