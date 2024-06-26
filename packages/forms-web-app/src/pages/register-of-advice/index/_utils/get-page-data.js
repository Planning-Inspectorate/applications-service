const { getProjectSearchURL } = require('../../../project-search/utils/get-project-search-url');
const { documentsPerPage } = require('../../../projects/_utils/pagination/documentsPerPage');
const {
	getPaginationUrl,
	getPagination
} = require('../../../projects/_utils/pagination/pagination');
const {
	getAdviceViewModel
} = require('../../../projects/section-51/index/_utils/get-advice-view-model');
const { getRegisterOfAdviceIndexURL } = require('./get-register-of-advice-index-url');

const getPageData = (req, query, caseRef, searchTerm, advice, pagination) => {
	const { paginationUrl, queryUrl } = getPaginationUrl(req, 'register-of-advice');
	const paginationView = getPagination(pagination);
	const resultsPerPage = documentsPerPage(query);

	return {
		...paginationView,
		advice: getAdviceViewModel(advice, caseRef, req.i18n),
		itemsPerPage: pagination.itemsPerPage,
		paginationUrl,
		queryUrl,
		resultsPerPage,
		searchTerm,
		projectSearchURL: getProjectSearchURL(),
		registerOfAdviceIndexURL: getRegisterOfAdviceIndexURL()
	};
};

module.exports = { getPageData };
