const { queryStringBuilder } = require('../../../../utils/query-string-builder');
const pageData = (params) => {
	const baseUrl = `/projects/${params.caseRef}`;
	const pageUrl = `${baseUrl}/application-documents`;
	const queryUrl = queryStringBuilder(params, ['category', 'searchTerm', 'stage', 'type'], false);
	const paginationUrl = `${pageUrl}?page=:page${queryUrl}`;

	return {
		caseRef: params.caseRef,
		baseUrl,
		pageUrl,
		queryUrl,
		paginationUrl
	};
};

module.exports = {
	pageData
};
