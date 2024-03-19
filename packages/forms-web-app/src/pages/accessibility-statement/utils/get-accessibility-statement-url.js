const { getOriginURL } = require('../../_utils/get-origin-url');
const { accessibilityStatementRoute } = require('../config');

const getAccessibilityStatementURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${accessibilityStatementRoute}`;
};

module.exports = { getAccessibilityStatementURL };
