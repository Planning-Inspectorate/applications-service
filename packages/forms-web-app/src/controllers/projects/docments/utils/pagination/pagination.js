const { getPaginationData, calculatePageOptions } = require('../../../../../lib/pagination');
const getPagination = (data) => {
	const paginationData = getPaginationData(data);
	const pageOptions = calculatePageOptions(paginationData);
	return {
		pageOptions,
		paginationData
	};
};

const getPaginationUrl = (req) => {
	const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
	url.searchParams.delete('page');
	const queryUrl = url.search;
	let paginationUrl;
	if (queryUrl) paginationUrl = `application-documents${queryUrl}&page=:page`;
	else paginationUrl = `application-documents?page=:page`;
	return {
		paginationUrl,
		queryUrl
	};
};

module.exports = {
	getPagination,
	getPaginationUrl
};
