const config = require('../config');
const documentSearch = require('../lib/document-search.json');
const output = require('../lib/output.json');
const { VIEW } = require('../lib/views');
const logger = require('../lib/logger');
const { searchDocument } = require('../services/document.service');

function getJsonDetails(doc) {
  item = {}
  item ["path"] = doc.path;
  item ["name"] = doc.path.replace('https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/','').split('/')[1].split('.pdf')[0];
  return item;
}

function getPageData(doc) {
  item = {}
  item ["totalItems"] = doc.totalItems;
  item ["itemsPerPage"] = doc.itemsPerPage;
  item ["totalPages"] = doc.totalPages;
  item ["currentPage"] = doc.currentPage;
  return item;
}

function filterData(documents, typeList, docList) {
  for (var key in documents) {  
    typeList.push(key);
    let subDocList = [];
   for (var subKey in documents[key]) {  
     subDocList.push(getJsonDetails(documents[key][subKey]));
   }
   docList.push(subDocList);
 }
}

exports.getDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;;
  if (pageNumber === 1) {
    req.session.document_search = '';
  }
  const search = req.session.document_search
  const searchDocumentData = JSON.stringify({...documentSearch, filters: []}).replace(0, pageNumber).replace('$search_term$', search);
  
  const respData = await searchDocument(caseRef, searchDocumentData);
  const documents = respData.documents[0];
  const pageData = getPageData(respData);
  let typeList = [];
  let docList = [];
  filterData(documents, typeList, docList);
  res.render(VIEW.DOCUMENT_OVERVIEW, { caseRef: caseRef, docList: docList, typeList: typeList, pageData: pageData });
};

exports.postSearchDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  const search = body['search'];
  req.session.document_search =  search;
  const filters = req.session.document_filters | [];
  const searchDocumentData = JSON.stringify({...documentSearch, filters: []}).replace(0, pageNumber).replace('$search_term$', search);
  logger.info('-----------'+searchDocumentData);
  const respData = await searchDocument(caseRef, searchDocumentData);
  const documents = respData.documents[0];
  const pageData = getPageData(respData);
  let typeList = [];
  let docList = [];
  filterData(documents, typeList, docList);
  res.render(VIEW.DOCUMENT_OVERVIEW, { caseRef: caseRef, docList: docList, typeList: typeList, pageData: pageData });
};

exports.postFilterDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  const filters = []; // should be taken from request TODO
  req.session.document_filters =  filters;
  const search = req.session.document_search;
  const searchDocumentData = JSON.stringify({...documentSearch, filters: filters}).replace(0, pageNumber).replace('$search_term$', search);
  const respData = await searchDocument(caseRef, searchDocumentData);
  const documents = respData.documents[0];
  const pageData = getPageData(respData);
  let typeList = [];
  let docList = [];
  filterData(documents, typeList, docList);
  res.render(VIEW.DOCUMENT_OVERVIEW, { caseRef: caseRef, docList: docList, typeList: typeList, pageData: pageData });
};