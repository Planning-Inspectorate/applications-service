const documentLibraryController = require('../../../src/controllers/document-library');
const { searchDocumentList } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/document-library', () => {
  let req;
  let res;
  const docList = [[{"name": "name","path": "https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/abc/name"}]];
  const pageData = {"totalItems": 1, "itemsPerPage": 20, "totalPages": 1,"currentPage": 1};

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      params: {
        case_ref: 'ABCD1234',
        page: 1
      },
      body: {
        search: 'test',
      },
    };
    res = mockRes();

    searchDocumentList.mockImplementation(() => Promise.resolve(
      {resp_code : 200, data : {
        "documents": [{
          "test":[{
            "type": "test",
            "path": "https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/abc/name",
          }]
        }],
        "totalItems": 1,
        "itemsPerPage": 20,
        "totalPages": 1,
        "currentPage": 1
        }} 
    ));
  });

  describe('getDocumentLibrary', () => {
    it('should call the correct template', async () => {
      await documentLibraryController.getDocumentLibrary(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.DOCUMENT_LIBRARY, {"caseRef": "ABCD1234", "docList": docList, "typeList": ["test"], pageData: pageData});
    });
  });

  describe('postSearchDocumentLibrary', () => {
    it('should call the correct template', async () => {
      await documentLibraryController.postSearchDocumentLibrary(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.DOCUMENT_LIBRARY, {"caseRef": "ABCD1234", "docList": docList, "typeList": ["test"], pageData: pageData});
    });
  });

  describe('postFilterDocumentLibrary', () => {
    it('should call the correct template', async () => {
      await documentLibraryController.postFilterDocumentLibrary(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.DOCUMENT_LIBRARY, {"caseRef": "ABCD1234", "docList": docList, "typeList": ["test"], pageData: pageData});
    });
  });
});