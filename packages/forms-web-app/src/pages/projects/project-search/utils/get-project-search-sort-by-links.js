const { getSortByLinks } = require('../../../_utils/get-sort-by-links');

const getProjectSearchSortByLinks = (query) =>
	getSortByLinks(query, [
		{
			name: 'Project name',
			value: 'projectName'
		},
		{
			name: 'Applicant',
			value: 'applicant'
		},
		{
			name: 'Stage',
			value: 'stage'
		}
	]);

module.exports = { getProjectSearchSortByLinks };
