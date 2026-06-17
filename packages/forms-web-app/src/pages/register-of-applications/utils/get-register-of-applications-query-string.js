const { registerOfApplicationsStages } = require('../../../utils/project-stages');
const { buildQueryString } = require('../../_utils/build-query-string');

const getRegisterOfApplicationsQueryString = ({ searchTerm, sortBy }) =>
	buildQueryString({
		excludeNullDateOfSubmission: true,
		searchTerm: searchTerm || '',
		sort: sortBy || '-DateOfDCOSubmission',
		stage: registerOfApplicationsStages
	});

module.exports = { getRegisterOfApplicationsQueryString };
