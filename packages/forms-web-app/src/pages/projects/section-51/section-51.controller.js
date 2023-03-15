const { documentsPerPage } = require('../utils/pagination/documentsPerPage');
const { listAdvice } = require('../../../services/advice.service');
const { getPagination, getPaginationUrl } = require('../utils/pagination/pagination');
const logger = require('../../../lib/logger');
const { adviceViewModel } = require('./section-51.view-model');

async function getSection51(req, res, next) {
	try {
		const { query } = req;
		const { locals } = res;
		const { searchTerm, page, itemsPerPage } = query;

		const { pagination, advice } = await listAdvice(locals.caseRef, searchTerm, {
			page: page,
			itemsPerPage: itemsPerPage
		});
		const { paginationUrl, queryUrl } = getPaginationUrl(req, 's51Advice');
		const paginationView = getPagination(pagination);
		const resultsPerPage = documentsPerPage(query);

		return res.render('projects/section-51/index.njk', {
			title: 'Section 51 Advice',
			advice: adviceViewModel(advice),
			pagination,
			resultsPerPage,
			...paginationView,
			paginationUrl,
			searchTerm,
			queryUrl
		});
	} catch (e) {
		logger.error(e);
		next(e);
	}
}

module.exports = {
	getSection51
};
