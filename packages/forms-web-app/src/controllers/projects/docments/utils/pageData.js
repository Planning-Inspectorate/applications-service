const { queryStringBuilder } = require('../../../../utils/query-string-builder');
const { getPaginationData, calculatePageOptions } = require('../../../../lib/pagination');
const pageData = (params, response, applicationResponse) => {
	const baseUrl = `/projects/${params.caseRef}`;
	const pageUrl = `${baseUrl}/application-documents`;
	const queryUrl = queryStringBuilder(params, ['category', 'searchTerm', 'stage', 'type'], false);
	const paginationUrl = `${pageUrl}?page=:page${queryUrl}`;

	const respData = response.data;
	const projectName = applicationResponse.data.ProjectName;
	const paginationData = getPaginationData(respData);
	const pageOptions = calculatePageOptions(paginationData);

	return {
		caseRef: params.caseRef,
		baseUrl,
		pageUrl,
		queryUrl,
		paginationUrl,
		pageOptions,
		paginationData,
		projectName
	};
};

module.exports = {
	pageData
};
