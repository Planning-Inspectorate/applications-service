const enProjectSearchTranslations = require('./en.json');

describe('pages/project-search/_translations/en', () => {
	it('should return the english projects index translations', () => {
		expect(enProjectSearchTranslations).toEqual({
			common: {
				projects: 'projects'
			},
			pageTitle: 'Project search',
			heading1: 'Projects',
			paragraph1:
				'This is a list of all projects. To find a specific project, use the filters or search by project name or applicant.',
			linkText1:
				'Download a table containing a complete list of all {{-totalApplications}} projects (CSV)',
			accessibilityText1: 'Search projects',
			heading2: 'Filtered results',
			paragraph2: 'Showing {{-from}} to {{-to}} of {{-total}} projects.',
			noResultsFound: {
				paragraph1: 'No results were found matching your search terms and filters.',
				paragraph2: 'Would you like to clear your search and filters to view all projects instead?',
				linkText1: 'Clear search and filters'
			},
			filterLabels: {
				region: 'Location',
				sector: 'Sector',
				stage: 'Stage'
			},
			sortByLinks: {
				projectName: 'Project name',
				promoterName: 'Applicant',
				stage: 'Stage'
			}
		});
	});
});
