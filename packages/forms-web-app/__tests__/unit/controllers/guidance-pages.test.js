const guidancePagesController = require('../../../src/controllers/guidance-pages');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

describe('controllers/guidance-pages', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getBeforeApply', () => {
    it('should call the correct template', async () => {
      await guidancePagesController.getBeforeApply(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.GUIDANCE_PAGES.BEFORE_APPLY, {
        currentUrl: '/before-you-apply',
        title: 'Lorem Ipsum',
      });
    });
  });
});
