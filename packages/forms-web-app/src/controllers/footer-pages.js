const { VIEW } = require('../lib/views');

exports.getTermsAndConditions = (_, res) => {
  res.render(VIEW.FOOTER_PAGES.TERMS_AND_CONDITIONS);
};

exports.getSitemap = (_, res) => {
  res.render(VIEW.FOOTER_PAGES.SITEMAP);
};

exports.getAccessibility = (_, res) => {
  res.render(VIEW.FOOTER_PAGES.ACCESSIBILITY);
};

exports.getCookiesInfo = (_, res) => {
  res.render(VIEW.FOOTER_PAGES.COOKIES);
};
