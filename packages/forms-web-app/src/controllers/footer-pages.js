const session = require('express-session');
const { VIEW } = require('../lib/views');

exports.getAccessibility = (req, res) => {
  delete req.session.serviceName;
  res.render(VIEW.FOOTER_PAGES.ACCESSIBILITY);
};

exports.getCookiesInfo = (req, res) => {
  delete req.session.serviceName;
  res.render(VIEW.FOOTER_PAGES.COOKIES);
};
