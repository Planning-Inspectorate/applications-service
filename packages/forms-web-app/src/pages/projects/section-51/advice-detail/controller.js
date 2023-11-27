const logger = require('../../../../lib/logger');
const { getAdviceDetailData } = require('../../../../services/advice.service');
const { getPageViewModel } = require('./_utils/get-page-view-model');

const view = 'projects/section-51/advice-detail/view.njk';

const getSection51AdviceDetailController = async (req, res, next) => {
	try {
		const { params } = req;
		const { locals } = res;
		const { caseRef } = locals;

		const adviceDetailData = await getAdviceDetailData(params.id, caseRef);

		return res.render(view, await getPageViewModel(locals, adviceDetailData));
	} catch (error) {
		logger.error(error);
		if (error.message === 'NOT_FOUND') return res.status(404).render('error/not-found');
		next(error);
	}
};

module.exports = { getSection51AdviceDetailController };
