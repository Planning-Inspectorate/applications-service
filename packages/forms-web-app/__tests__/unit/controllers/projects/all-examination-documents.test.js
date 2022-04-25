const controller = require('../../../../src/controllers/projects/all-examination-documents');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/projects/all-examination-documents', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      ...mockReq(),
      session: {
        caseRef: 'ABCD1234',
        projectName: 'ABC',
      },
    };
    res = mockRes();
  });

  describe('getAllExaminationDocuments', () => {
    it('should call the correct template', async () => {
      await controller.getAllExaminationDocuments(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.PROJECTS.ALL_EXAMINATION_DOCUMENTS, {
        projectName: 'ABC',
        caseRef: 'ABCD1234',
      });
    });
  });
});
