const logger = require('../../../../lib/logger');
const { getAdviceDetailData } = require('../../../../services/advice.service');
const { registerOfAdviceCaseRef } = require('../../../register-of-advice/index/config');
const { getPageViewModel } = require('./_utils/get-page-view-model');
const { getView } = require('./_utils/get-view');

const getSection51AdviceDetailController = async (req, res, next) => {
	try {
		const { i18n, params, path, session } = req;
		const { case_ref, id } = params;

		const caseRef = case_ref || registerOfAdviceCaseRef;

		const refURL = session.registerOfAdviceBackLink || req.get('Referrer');
		const adviceDetailData = await getAdviceDetailData(id, caseRef);

		const view = getView(path, id);

		return res.render(
			view,
			await getPageViewModel(refURL, path, case_ref, id, adviceDetailData, i18n)
		);
	} catch (error) {
		logger.error(error);
		if (error.message === 'NOT_FOUND') return res.status(404).render('error/not-found');
		next(error);
	}
};

module.exports = { getSection51AdviceDetailController };
