const { registerOfApplicationsStages } = require('../../../utils/project-stages');
const { buildQueryString } = require('../../_utils/build-query-string');

const getRegisterOfApplicationsQueryString = ({ page, searchTerm, itemsPerPage, sortBy }) =>
	buildQueryString({
		page: page || 1,
		searchTerm: searchTerm || '',
		size: itemsPerPage || 25,
		sort: sortBy || '+DateOfDCOSubmission',
		stage: registerOfApplicationsStages
	});

module.exports = { getRegisterOfApplicationsQueryString };
