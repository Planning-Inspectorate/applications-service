const { getPageData } = require('./_utils/get-page-data');

const view = 'process-guide/index/view.njk';

const getProcessGuideController = (req, res) => {
	const { session } = req;
	const refUrl = req.get('Referrer');
	return res.render(view, getPageData(refUrl, session));
};

module.exports = { getProcessGuideController };
