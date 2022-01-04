const logger = require('../lib/logger');
const documentSearch = require('../lib/document-search.json');
const { VIEW } = require('../lib/views');
const { searchDocument } = require('../services/document.service');

function getPageData(doc) {
  const item = {};
  item.totalItems = doc.totalItems;
  item.itemsPerPage = doc.itemsPerPage;
  item.totalPages = doc.totalPages;
  item.currentPage = doc.currentPage;
  return item;
}

function renderData(req, res, caseRef, response) {
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.DOCUMENT_LIBRARY, {
      projectName,
      caseRef,
      pageData: {},
    });
  } else {
    const respData = response.data;
    const { documents } = respData;
    logger.debug(`Document data received:  ${JSON.stringify(documents)} `);
    const pageData = getPageData(respData);
    res.render(VIEW.DOCUMENT_LIBRARY, {
      documents,
      projectName,
      caseRef,
      pageData,
    });
  }
}

exports.getDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  let search = req.session.document_search;
  if (pageNumber === '1') {
    search = '';
  }
  const searchDocumentData = JSON.stringify({ ...documentSearch, filters: [] })
    .replace(0, pageNumber)
    .replace('$search_term$', search);
  const response = await searchDocument(caseRef, searchDocumentData);
  renderData(req, res, caseRef, response);
};

exports.postSearchDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  const { search } = body;
  req.session.document_search = search;
  const filters = req.session.document_filters | [];
  const searchDocumentData = JSON.stringify({ ...documentSearch, filters: [] })
    .replace(0, pageNumber)
    .replace('$search_term$', search);
  const response = await searchDocument(caseRef, searchDocumentData);
  renderData(req, res, caseRef, response);
};

exports.postFilterDocumentLibrary = async (req, res) => {
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
