const { searchAdvice, getAdviceOnProjectById } = require('../lib/application-api-wrapper');

const mapResponse = (data) => ({
	advice: data.advice,
	pagination: {
		totalItems: data.totalItems,
		itemsPerPage: data.itemsPerPage,
		totalPages: data.totalPages,
		currentPage: data.currentPage
	}
});

const listAdvice = async (
	caseReference,
	searchTerm = '',
	{ itemsPerPage = 25, page = 1, sortBy = '' }
) => {
	const { data } = await searchAdvice({
		caseReference,
		searchTerm,
		size: itemsPerPage,
		page,
		sort: sortBy
	});
	return mapResponse(data);
};

const getAdviceDetailData = async (adviceId, caseReference) => {
	const rawAdviceDetail = await getAdviceOnProjectById(adviceId, caseReference);
	if (rawAdviceDetail.resp_code === 404) throw new Error('NOT_FOUND');
	return rawAdviceDetail.data;
};

module.exports = {
	listAdvice,
	getAdviceDetailData
};
