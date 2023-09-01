const { getSortByLinks } = require('../../../_utils/get-sort-by-links');

const getApplicationsRegisterSortByLinks = (query) =>
	getSortByLinks(query, [
		{
			name: 'Project name',
			value: 'projectName'
		},
		{
			name: 'Location'
		},
		{
			name: 'Applicant',
			value: 'applicant'
		},
		{
			name: 'Date of application',
			value: 'applicationDate'
		},
		{
			name: 'Date of decision',
			value: 'decisionDate'
		},
		{
			name: 'Stage',
			value: 'stage'
		}
	]);

module.exports = { getApplicationsRegisterSortByLinks };
