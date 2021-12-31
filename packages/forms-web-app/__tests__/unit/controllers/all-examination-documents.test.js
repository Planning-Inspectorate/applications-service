const controller = require('../../../src/controllers/all-examination-documents');
const { getProjectData } = require('../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

jest.mock('../../../src/lib/application-api-wrapper');

describe('controllers/all-examination-documents', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getAllExaminationDocuments', () => {
    it('should call the correct template', async () => {
      getProjectData.mockImplementation(() =>
        Promise.resolve({
          resp_code: 200,
          data: {
            ProjectName: 'St James Barton Giant Wind Turbine',
            CaseReference: 'EN010009',
          },
        })
      );
      await controller.getAllExaminationDocuments(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.ALL_EXAMINATION_DOCUMENTS, {
        projectName: 'St James Barton Giant Wind Turbine',
        caseRef: 'EN010009',
      });
    });
  });
});
