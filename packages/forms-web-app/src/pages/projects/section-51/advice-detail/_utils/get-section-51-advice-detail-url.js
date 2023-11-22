const { getSection51URL } = require('../../_utils/get-section-51-url');
const { section51AdviceDetailRouteParam } = require('../config');

const getSection51AdviceDetailURL = (
	caseRef,
	adviceDetailId = `:${section51AdviceDetailRouteParam}`
) => {
	const section51URL = getSection51URL(caseRef);

	return `${section51URL}/${adviceDetailId}`;
};

module.exports = { getSection51AdviceDetailURL };
