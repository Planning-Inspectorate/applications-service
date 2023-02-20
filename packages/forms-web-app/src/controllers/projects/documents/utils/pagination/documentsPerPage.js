const { buildQueryString } = require('../common/buildQuerySring');

const getDocumentsPerPage = (query, size) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	delete localQuery.page;
	localQuery.itemsPerPage = size;
	return {
		size,
		link: buildQueryString(localQuery)
	};
};
const documentsPerPage = (query) => ({
	twentyFive: getDocumentsPerPage(query, 25),
	fifty: getDocumentsPerPage(query, 50),
	oneHundred: getDocumentsPerPage(query, 100)
});

module.exports = {
	documentsPerPage
};
