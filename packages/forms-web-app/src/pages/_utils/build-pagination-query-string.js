const querystring = require('node:querystring');
const { buildQueryString } = require('./build-query-string');

const buildPaginationQueryString = (query) => {
	const localQuery = JSON.parse(JSON.stringify(query));

	delete localQuery.page;

	localQuery.page = ':page';

	return querystring.unescape(buildQueryString(localQuery));
};

module.exports = { buildPaginationQueryString };
