const { getSection51URL } = require('../../_utils/get-section-51-url');
const { section51IndexRoute } = require('../config');

const getSection51IndexURL = (caseRef) => {
	const section51URL = getSection51URL(caseRef);
	const section51IndexPath = section51IndexRoute ? `/${section51IndexRoute}` : '';

	return `${section51URL}${section51IndexPath}`;
};

module.exports = { getSection51IndexURL };
