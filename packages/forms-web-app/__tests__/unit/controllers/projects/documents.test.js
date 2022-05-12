const aboutTheApplicationController = require('../../../../src/controllers/projects/documents');
const { searchDocumentListV2 } = require('../../../../src/lib/application-api-wrapper');
const { getAppData } = require('../../../../src/services/application.service');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

jest.mock('../../../../src/lib/application-api-wrapper');
jest.mock('../../../../src/services/application.service');

describe('controllers/documents', () => {
  let req;
  let res;
  const docList = [
    {
      case_reference: 'ABCD1234',
      Stage: 1,
      type: 'test',
      path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/ABC',
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      params: {
        page: '1',
        case_ref: 'ABCD1234',
      },
      url: '/abc?xyz',
      query: '',
    };
    res = mockRes();

    searchDocumentListV2.mockImplementation(() =>
      Promise.resolve({
        resp_code: 200,
        data: {
          documents: [
            {
              case_reference: 'ABCD1234',
              Stage: 1,
              type: 'test',
              path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/ABC',
            },
          ],
          filters: {
            stageFilters: [],
            typeFilters: [],
          },
          totalItems: 1,
          itemsPerPage: 20,
          totalPages: 1,
          currentPage: 1,
        },
      })
    );

    getAppData.mockImplementation(() =>
      Promise.resolve({
        resp_code: 200,
        data: {
          ProjectName: 'St James Barton Giant Wind Turbine',
        },
      })
    );
  });

  describe('getAboutTheApplication', () => {
    it('should call the correct template', async () => {
      await aboutTheApplicationController.getApplicationDocuments(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.DOCUMENTS, {
        documents: docList,
        projectName: 'St James Barton Giant Wind Turbine',
        caseRef: 'ABCD1234',
        modifiedStageFilters: [],
        pageOptions: [1],
        top5TypeFilters: [],
        queryUrl: '',
        searchTerm: undefined,
        paginationData: {
          currentPage: 1,
          fromRange: 1,
          itemsPerPage: 20,
          toRange: 1,
          totalItems: 1,
          totalPages: 1,
        },
      });
    });

    it('should call the correct template if received 404', async () => {
      searchDocumentListV2.mockImplementation(() =>
        Promise.resolve({
          resp_code: 404,
        })
      );
      await aboutTheApplicationController.getApplicationDocuments(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.DOCUMENTS, {
        projectName: 'St James Barton Giant Wind Turbine',
        caseRef: 'ABCD1234',
      });
    });
  });
});
