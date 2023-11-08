const { VIEW } = require('../lib/views');

exports.getCookiesInfo = (_, res) => {
	res.render(VIEW.FOOTER_PAGES.COOKIES);
};
