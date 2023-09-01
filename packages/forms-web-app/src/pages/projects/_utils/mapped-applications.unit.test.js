const { mappedApplications } = require('./mapped-applications');
const { applicationsDataFixture } = require('../../_fixtures');

describe('projects/_utils/mapped-applications', () => {
	describe('#mappedApplications', () => {
		it('should take applications API response and returned correctly mapped data', () => {
			const result = mappedApplications(applicationsDataFixture);

			expect(result).toEqual([
				{
					applicant: 'EDF',
					pageURL: '/projects/TR010001',
					projectName: 'Accessibility Test',
					stage: 'Examination'
				},
				{
					applicant: 'John Agent Burke',
					pageURL: '/projects/TR023024',
					projectName: 'April 7 2020',
					stage: 'Pre-application'
				}
			]);
		});
	});
});
