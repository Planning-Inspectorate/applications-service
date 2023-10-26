const { getPageData } = require('./_utils/get-page-data');

const view = 'have-your-say-guide/index/view.njk';

const getHaveYourSayGuideController = (req, res) => {
	const { session } = req;
	const refUrl = req.get('Referrer');
	return res.render(view, getPageData(refUrl, session));
};

module.exports = { getHaveYourSayGuideController };
