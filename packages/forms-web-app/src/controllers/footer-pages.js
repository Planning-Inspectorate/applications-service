const { VIEW } = require('../lib/views');

exports.getAccessibility = (_, res) => {
	res.render(VIEW.FOOTER_PAGES.ACCESSIBILITY);
};

exports.getCookiesInfo = (_, res) => {
	res.render(VIEW.FOOTER_PAGES.COOKIES);
};
