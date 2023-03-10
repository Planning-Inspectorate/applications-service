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

const listAdvice = async (caseRef, searchTerm = '', { itemsPerPage = 25, page = 1 }) => {
	const { data } = await rawAdviceDocuments({
		caseRef,
		searchTerm,
		size: itemsPerPage,
		page
	});
	return mapResponse(data);
};

module.exports = {
	listAdvice
};
