const controller = require('../../../../src/controllers/examination/recommendations');
const { mockReq, mockRes } = require('../../mocks');
const { VIEW } = require('../../../../src/lib/views');

describe('controllers/examination/recommendations', () => {
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

  describe('getRecommendations', () => {
    it('should call the correct template', async () => {
      await controller.getRecommendations(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.EXAMINATION.RECOMMENDATIONS, {
        projectName: 'ABC',
        caseRef: 'ABCD1234',
      });
    });
  });
});
