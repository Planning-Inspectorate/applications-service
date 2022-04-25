const aboutTheApplicationController = require('../../../../src/controllers/examination/about-the-application');
const { searchDocumentListV2 } = require('../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

jest.mock('../../../../src/lib/application-api-wrapper');

describe('controllers/about-the-application', () => {
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
  const pageData = {
    totalItems: 1,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
    toRange: 1,
    fromRange: 1,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      params: {
        page: '1',
        case_ref: 'ABCD1234',
      },
      session: {
        projectName: 'ABC',
      },
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
          totalItems: 1,
          itemsPerPage: 20,
          totalPages: 1,
          currentPage: 1,
        },
      })
    );
  });

  describe('getAboutTheApplication', () => {
    it('should call the correct template', async () => {
      await aboutTheApplicationController.getAboutTheApplication(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.ABOUT_THE_APPLICATION, {
        documents: docList,
        projectName: 'ABC',
        caseRef: 'ABCD1234',
        pageData,
        paginationData: [1],
      });
    });

    it('should call the correct template if received 404', async () => {
      searchDocumentListV2.mockImplementation(() =>
        Promise.resolve({
          resp_code: 404,
        })
      );
      await aboutTheApplicationController.getAboutTheApplication(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.ABOUT_THE_APPLICATION, {
        projectName: 'ABC',
        caseRef: 'ABCD1234',
      });
    });
  });
});
