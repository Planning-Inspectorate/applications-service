const controller = require('../../../../src/controllers/examination/representations');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/examination/representations', () => {
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

  describe('getRepresentations', () => {
    it('should call the correct template', async () => {
      await controller.getRepresentations(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.REPRESENTATIONS, {
        projectName: 'ABC',
        caseRef: 'ABCD1234',
      });
    });
  });
});
