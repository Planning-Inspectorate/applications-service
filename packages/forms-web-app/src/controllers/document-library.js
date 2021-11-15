const config = require('../config');
const documentSearch = require('../lib/document-search.json');
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
  Object.keys(documents).forEach(function(key) {
    Object.keys(documents[key]).forEach(function(key) {
      typeList.push(key); 
    })
    Object.values(documents[key]).forEach(function(docs) {
      let subDocList = [];
      for (key in docs) { 
        subDocList.push(getJsonDetails(docs[key]));
      }
      docList.push(subDocList);
    })
  })
}

function renderData(res, caseRef, respData){
  const documents = respData.documents;
  const pageData = getPageData(respData);
  let typeList = [];
  let docList = [];
  filterData(documents, typeList, docList);
  res.render(VIEW.DOCUMENT_OVERVIEW, { caseRef: caseRef, docList: docList, typeList: typeList, pageData: pageData });
}

exports.getDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  let search = req.session.document_search
  if (pageNumber === '1') {
    search = '';
  }
  const searchDocumentData = JSON.stringify({...documentSearch, filters: []}).replace(0, pageNumber).replace('$search_term$', search);
  const respData = await searchDocument(caseRef, searchDocumentData);
  renderData(res, caseRef, respData);
};

exports.postSearchDocumentLibrary = async (req, res) => {
  const caseRef = req.params.case_ref;
  const pageNumber = req.params.page;
  const { body } = req;
  const search = body['search'];
  req.session.document_search =  search;
  const filters = req.session.document_filters | [];
  const searchDocumentData = JSON.stringify({...documentSearch, filters: []}).replace(0, pageNumber).replace('$search_term$', search);
  const respData = await searchDocument(caseRef, searchDocumentData);
  if (respData.resp_code === 404) {
    res.render(VIEW.DOCUMENT_OVERVIEW, { caseRef: caseRef, docList: [], typeList: [], pageData: {} });
  } else {
    renderData(res, caseRef, respData);
  }
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
  renderData(res, caseRef, respData);
};