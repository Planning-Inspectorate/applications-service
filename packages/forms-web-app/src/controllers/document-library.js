const config = require('../config');
const documentSearch = require('../lib/document-search.json');
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { searchDocument } = require('../services/document.service');

exports.getDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const searchDocumentData = JSON.stringify({...documentSearch, filters: []}).replace(0, pageNumber).replace('$search_term$', '');
 
  logger.info(searchDocumentData);
  //const appData = await searchDocument(caseRef, searchDocumentData);

  res.render(VIEW.DOCUMENT_OVERVIEW);
};

exports.postSearchDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  const search = body['search'];
  req.session.document_search =  search;
  const filters = req.session.document_filters;
  const searchDocumentData = JSON.stringify({...documentSearch, filters: filters}).replace(0, pageNumber).replace('$search_term$', search);
  const appData = await searchDocument(caseRef, searchDocumentData);
  delete req.session;
  res.render(VIEW.DOCUMENT_OVERVIEW);
};

exports.postFilterDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  logger.info('--------'+ JSON.stringify(body));
  const filters = ['abc', '123'];//body['theme'];
  req.session.document_filters =  filters;
  const search = req.session.document_search;
  const searchDocumentData = JSON.stringify({...documentSearch, filters: filters}).replace(0, pageNumber).replace('$search_term$', search);

  const appData = await searchDocument(caseRef, searchDocumentData);

  res.render(VIEW.DOCUMENT_OVERVIEW);
};
