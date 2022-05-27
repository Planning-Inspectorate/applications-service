const examinationController = require('../../../../src/controllers/examination/examination');
const { getProjectData } = require('../../../../src/lib/application-api-wrapper');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

jest.mock('../../../../src/lib/application-api-wrapper');

describe('controllers/examination/examination', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getExamination', () => {
    it('should call the correct template', async () => {
      getProjectData.mockImplementation(() =>
        Promise.resolve({
          resp_code: 200,
          data: { DateOfRelevantRepresentationClose: '2020-02-02' },
        })
      );
      await examinationController.getExamination(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.EXAMINATION, {
        appData: { DateOfRelevantRepresentationClose: '2020-02-02' },
        stage: undefined,
        dateOfClosure: 'Sunday 02 February 2020',
        caseRef: undefined,
        periodOpen: false,
        projectName: undefined,
      });
    });
  });
});
