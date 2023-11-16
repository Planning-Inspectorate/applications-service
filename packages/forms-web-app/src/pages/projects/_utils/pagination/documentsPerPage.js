const { buildQueryString } = require('../../documents/utils/common/buildQuerySring');

const defaultDocumentsPerPage = 25;

const isItemsPerPageEqualToSize = (query, size) => Number(query.itemsPerPage) === size;

const isDefaultItemsPerPage = (query, size) =>
	!query.itemsPerPage && size === defaultDocumentsPerPage;

const getActive = (query, size) =>
	isItemsPerPageEqualToSize(query, size) || isDefaultItemsPerPage(query, size);

const getDocumentsPerPage = (query, size) => {
	const localQuery = JSON.parse(JSON.stringify(query));
	const active = getActive(localQuery, size);
	delete localQuery.page;
	localQuery.itemsPerPage = size;
	return {
		size,
		link: buildQueryString(localQuery),
		active
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
