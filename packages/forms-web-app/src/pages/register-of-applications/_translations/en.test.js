const registerOfApplicationsTranslations__EN = require('./en.json');

describe('pages/register-of-applications/_translations/en', () => {
	it('should return the english index page translations', () => {
		expect(registerOfApplicationsTranslations__EN).toEqual({
			heading1: 'Register of applications',
			paragraph1:
				'Below is a list of all applications submitted since 2008. This complies with Section 39 of the Planning Act 2008.',
			paragraph2: 'Search by project name or applicant.',
			linkText1:
				'Download a table containing a complete list of all {{-totalApplications}} projects (CSV)',
			paragraph3: 'Showing {{-from}} to {{-to}} of {{-total}} projects.',
			sortByLinks: {
				projectName: 'Project name',
				location: 'Location',
				applicant: 'Applicant',
				dateOfApplication: 'Date of application',
				dateOfDecision: 'Date of decision',
				stage: 'Stage'
			}
		});
	});
});
