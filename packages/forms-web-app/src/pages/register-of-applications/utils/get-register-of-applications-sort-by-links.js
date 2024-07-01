const { getSortByLinks } = require('../../_utils/get-sort-by-links');

const getRegisterOfApplicationsSortByLinks = (i18n, query) =>
	getSortByLinks(query, [
		{
			name: i18n.t('registerOfApplications.sortByLinks.projectName'),
			value: 'ProjectName'
		},
		{
			name: i18n.t('registerOfApplications.sortByLinks.location')
		},
		{
			name: i18n.t('registerOfApplications.sortByLinks.applicant'),
			value: 'PromoterName'
		},
		{
			name: i18n.t('registerOfApplications.sortByLinks.dateOfApplication'),
			value: 'DateOfDCOSubmission'
		},
		{
			name: i18n.t('registerOfApplications.sortByLinks.dateOfDecision'),
			value: 'ConfirmedDateOfDecision'
		},
		{
			name: i18n.t('registerOfApplications.sortByLinks.stage'),
			value: 'Stage'
		}
	]);

module.exports = { getRegisterOfApplicationsSortByLinks };
