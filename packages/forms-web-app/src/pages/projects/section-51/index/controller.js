const { documentsPerPage } = require('../../_utils/pagination/documentsPerPage');
const { listAdvice } = require('../../../../services/advice.service');
const { getPagination, getPaginationUrl } = require('../../_utils/pagination/pagination');
const logger = require('../../../../lib/logger');
const { getAdviceViewModel } = require('./_utils/get-advice-view-model');
const { doesAdviceExist, wasSearchAttempted } = require('./_utils/advice-helpers');

async function getSection51IndexController(req, res, next) {
	try {
		const { i18n, query } = req;
		const { searchTerm, page, itemsPerPage } = query;
		const { locals } = res;
		const { caseRef } = locals;

		const { pagination, advice } = await listAdvice(caseRef, searchTerm, {
			page: page,
			itemsPerPage: itemsPerPage
		});

		const { paginationUrl, queryUrl } = getPaginationUrl(req, 's51Advice');
		const paginationView = getPagination(pagination);
		const resultsPerPage = documentsPerPage(query);
		const adviceViewModel = getAdviceViewModel(advice, caseRef, i18n);
		const adviceExists = doesAdviceExist(adviceViewModel);
		const searchAttempted = wasSearchAttempted(queryUrl);

		return res.render('projects/section-51/index/view.njk', {
			adviceViewModel,
			adviceExists,
			searchAttempted,
			pagination,
			resultsPerPage,
			...paginationView,
			paginationUrl,
			searchTerm
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
}

module.exports = {
	getSection51IndexController
};
