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
      // Purposefully broken for ASB-204
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.ABOUT_THE_APPLICATION, {
        appData: { DateOfRelevantRepresentationClose: '2020-02-02' },
        stage: undefined,
        dateOfClosure: 'Sunday 02 February 2020',
      });
    });
  });
});
