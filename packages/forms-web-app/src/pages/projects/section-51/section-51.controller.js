const { documentsPerPage } = require('../utils/pagination/documentsPerPage');
const { listAdvice } = require('../../../services/advice.service');
const { getPagination, getPaginationUrl } = require('../utils/pagination/pagination');
const logger = require('../../../lib/logger');

async function getSection51(req, res) {
	try {
		const { query } = req;
		const { locals } = res;

		const { pagination, advice } = await listAdvice(locals.caseRef, query.searchTerm, {
			page: query.page,
			itemsPerPage: query.itemsPerPage
		});
		const { paginationUrl } = getPaginationUrl(req, 's51Advice');
		const paginationView = getPagination(pagination);
		const resultsPerPage = documentsPerPage(query);

		return res.render('projects/section-51/index.njk', {
			title: 'Section 51 Advice',
			advice,
			pagination,
			resultsPerPage,
			...paginationView,
			paginationUrl
		});
	} catch (e) {
		logger.error(e);
		return res.render('error/unhandled-exception');
	}
}

module.exports = {
	getSection51
};
