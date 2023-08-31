const querystring = require('node:querystring');

const buildQueryString = (query) => `?${querystring.stringify(query)}`;

module.exports = { buildQueryString };
