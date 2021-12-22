const footerPagesController = require('../../../src/controllers/footer-pages');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

describe('controllers/footer-pages', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getTermsAndConditions', () => {
    it('should call the correct template', async () => {
      await footerPagesController.getTermsAndConditions(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.FOOTER_PAGES.TERMS_AND_CONDITIONS);
    });
  });

  describe('getSitemap', () => {
    it('should call the correct template', async () => {
      await footerPagesController.getSitemap(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.FOOTER_PAGES.SITEMAP);
    });
  });

  describe('getAccessibility', () => {
    it('should call the correct template', async () => {
      await footerPagesController.getAccessibility(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.FOOTER_PAGES.ACCESSIBILITY);
    });
  });

  describe('getCookiesInfo', () => {
    it('should call the correct template', async () => {
      await footerPagesController.getCookiesInfo(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.FOOTER_PAGES.COOKIES);
    });
  });
});
