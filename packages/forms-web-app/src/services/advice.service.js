/* eslint-disable camelcase */
const { handler } = require('../lib/application-api-wrapper');

const mapResponse = (data) => ({
	advice: data.advice,
	pagination: {
		totalItems: data.totalItems,
		itemsPerPage: data.itemsPerPage,
		totalPages: data.totalPages,
		currentPage: data.currentPage
	}
});

const rawAdviceDocuments = async (params) => {
	const searchParams = new URLSearchParams(params);
	const url = `/api/v1/advice?${searchParams.toString()}`;
	const method = 'GET';
	return handler('searchAdviceDocuments', url, method, {});
};

const listAdvice = async (
	caseReference,
	searchTerm = '',
	{ itemsPerPage = 25, page = 1, sortBy = '' }
) => {
	const { data } = await rawAdviceDocuments({
		caseReference,
		searchTerm,
		size: itemsPerPage,
		page,
		sort: sortBy
	});
	return mapResponse(data);
};

const getRawAdviceDetail = async (adviceId, caseReference) => {
	const url = `/api/v1/advice/${adviceId}?caseReference=${caseReference}`;
	const method = 'GET';
	return handler('getAdviceDetail', url, method);
};

const getAdviceDetailData = async (adviceId, caseReference) => {
	const rawAdviceDetail = await getRawAdviceDetail(adviceId, caseReference);
	if (rawAdviceDetail.resp_code === 404) throw new Error('NOT_FOUND');
	return rawAdviceDetail.data;
};

module.exports = {
	listAdvice,
	getAdviceDetailData
};
