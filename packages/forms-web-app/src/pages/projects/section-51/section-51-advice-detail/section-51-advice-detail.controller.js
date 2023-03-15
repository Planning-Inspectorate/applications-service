const { getAdviceDetailData } = require('../../../../services/advice.service');
const { getPageViewModel } = require('./utils/get-page-view-model');
const logger = require('../../../../lib/logger');

const getSection51AdviceDetail = async (req, res) => {
	try {
		const { params } = req;
		const { locals } = res;
		const adviceDetailData = await getAdviceDetailData(params.id);
		const referer = req.get('Referer');
		return res.render(
			'projects/section-51/section-51-advice-detail/index.njk',
			await getPageViewModel(locals, adviceDetailData, referer)
		);
	} catch (e) {
		logger.error(e);
		if (e.message === 'NOT_FOUND') return res.status(404).render('error/not-found');
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = { getSection51AdviceDetail };
