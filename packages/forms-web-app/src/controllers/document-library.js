const documentSearch = require('../lib/document-search.json');
const { VIEW } = require('../lib/views');
const { searchDocument } = require('../services/document.service');

function getJsonDetails(doc) {
  const item = {};
  item.path = doc.path;
  item.name =
    doc.path &&
    doc.path
      .replace('https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/', '')
      .split('/')[1]
      .split('.pdf')[0];
  return item;
}

function getPageData(doc) {
  const item = {};
  item.totalItems = doc.totalItems;
  item.itemsPerPage = doc.itemsPerPage;
  item.totalPages = doc.totalPages;
  item.currentPage = doc.currentPage;
  return item;
}

function filterData(documents, typeList, docList) {
  Object.keys(documents).forEach(function (key) {
    Object.keys(documents[key]).forEach(function (key) {
      typeList.push(key);
    });
    Object.values(documents[key]).forEach(function (docs) {
      const subDocList = [];
      for (key in docs) {
        subDocList.push(getJsonDetails(docs[key]));
      }
      docList.push(subDocList);
    });
  });
}

function renderData(req, res, caseRef, response) {
  const { projectName } = req.session;
  if (response.resp_code === 404) {
    res.render(VIEW.DOCUMENT_LIBRARY, {
      projectName,
      caseRef,
      docList: [],
      typeList: [],
      pageData: {},
    });
  } else {
    const respData = response.data;
    const { documents } = respData;
    const pageData = getPageData(respData);
    const typeList = [];
    const docList = [];
    filterData(documents, typeList, docList);
    res.render(VIEW.DOCUMENT_LIBRARY, {
      projectName,
      caseRef,
      docList,
      typeList,
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
