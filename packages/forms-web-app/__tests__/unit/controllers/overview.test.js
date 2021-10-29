const overviewController = require('../../../src/controllers/overview');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

describe('controllers/overview', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getOverview', () => {
    it('should call the correct template', async () => {
      await overviewController.getOverview(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.OVERVIEW);
    });
  });
});