const { getSortByLinks } = require('../../_utils/get-sort-by-links');

const getRegisterOfApplicationsSortByLinks = (query) =>
	getSortByLinks(query, [
		{
			name: 'Project name',
			value: 'ProjectName'
		},
		{
			name: 'Location'
		},
		{
			name: 'Applicant',
			value: 'PromoterName'
		},
		{
			name: 'Date of application',
			value: 'DateOfDCOSubmission'
		},
		{
			name: 'Date of decision',
			value: 'ConfirmedDateOfDecision'
		},
		{
			name: 'Stage',
			value: 'Stage'
		}
	]);

module.exports = { getRegisterOfApplicationsSortByLinks };
