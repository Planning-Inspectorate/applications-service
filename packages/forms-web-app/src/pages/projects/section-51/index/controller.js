const { documentsPerPage } = require('../../_utils/pagination/documentsPerPage');
const { listAdvice } = require('../../../../services/advice.service');
const { getPagination, getPaginationUrl } = require('../../_utils/pagination/pagination');
const logger = require('../../../../lib/logger');
const { getAdviceViewModel } = require('./_utils/get-advice-view-model');

async function getSection51IndexController(req, res, next) {
	try {
		const { query } = req;
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

		return res.render('projects/section-51/index/view.njk', {
			title: 'Section 51 advice',
			advice: getAdviceViewModel(advice, caseRef),
			pagination,
			resultsPerPage,
			...paginationView,
			paginationUrl,
			searchTerm,
			queryUrl
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
}

module.exports = {
	getSection51IndexController
};
