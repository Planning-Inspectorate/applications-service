const { getSortByLinks } = require('../../_utils/get-sort-by-links');

const getProjectSearchSortByLinks = (query) =>
	getSortByLinks(query, [
		{
			name: 'Project name',
			value: 'ProjectName'
		},
		{
			name: 'Applicant',
			value: 'PromoterName'
		},
		{
			name: 'Stage',
			value: 'Stage'
		}
	]);

module.exports = { getProjectSearchSortByLinks };
