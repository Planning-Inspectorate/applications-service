const logger = require('../../lib/logger');
const { generatePagination } = require('../../lib/pagination');
const documentSearch = require('../../lib/document-search.json');
const { VIEW } = require('../../lib/views');
const { searchDocument } = require('../../services/document.service');

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

function renderData(req, res, caseRef, response) {
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.EXAMINATION.ABOUT_THE_APPLICATION, {
      projectName,
      caseRef,
    });
  } else {
    const respData = response.data;
    const { documents } = respData;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const pageData = getPageData(respData);
    const paginationData = generatePagination(pageData.currentPage, pageData.totalPages);
    res.render(VIEW.EXAMINATION.ABOUT_THE_APPLICATION, {
      documents,
      projectName,
      caseRef,
      pageData,
      paginationData,
    });
  }
}

exports.getAboutTheApplication = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  let search = req.session.document_search ? req.session.document_search : '';
  if (pageNumber === '1') {
    search = '';
  }
  const searchDocumentData = JSON.stringify({ ...documentSearch, filters: [] })
    .replace(0, pageNumber)
    .replace('$search_term$', search);
  const response = await searchDocument(caseRef, searchDocumentData);
  renderData(req, res, caseRef, response);
};

exports.postSearchDocument = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  const { search } = body;
  req.session.document_search = search;
  const searchDocumentData = JSON.stringify({ ...documentSearch, filters: [] })
    .replace(0, pageNumber)
    .replace('$search_term$', search);
  const response = await searchDocument(caseRef, searchDocumentData);
  renderData(req, res, caseRef, response);
};

exports.postFilterDocument = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const filters = []; // should be taken from request TODO
  req.session.document_filters = filters;
  const search = req.session.document_search;
  const searchDocumentData = JSON.stringify({ ...documentSearch, filters })
    .replace(0, pageNumber)
    .replace('$search_term$', search);
  const response = await searchDocument(caseRef, searchDocumentData);
  renderData(req, res, caseRef, response);
};
