const querystring = require('node:querystring');
const { buildQueryString } = require('./build-query-string');

const buildPaginationQueryString = (query) => {
	const pageQueryValue = ':page';
	const escapedPageQueryValue = querystring.escape(pageQueryValue);

	const localQuery = JSON.parse(JSON.stringify(query));

	delete localQuery.page;

	localQuery.page = pageQueryValue;

	return buildQueryString(localQuery).replace(escapedPageQueryValue, pageQueryValue);
};

module.exports = { buildPaginationQueryString };
