const { mapApplications } = require('./map-applications');

const { applicationsDataFixture } = require('../_fixtures');

describe('_utils/map-applications', () => {
	describe('#mapApplications', () => {
		it('should take applications API response and returned correctly mapped data', () => {
			const result = mapApplications(applicationsDataFixture);

			expect(result).toEqual([
				{
					applicant: 'mock promoter first name 1 mock promoter last name 1',
					applicationDate: '01 Jan 2018',
					decisionDate: '',
					location: 'mock project location 1',
					pageURL: '/projects/mock case reference 1',
					projectName: 'mock project name 1',
					stage: 'Pre-application'
				},
				{
					applicant: 'mock promoter first name 2 mock promoter last name 2',
					applicationDate: '',
					decisionDate: '',
					location: 'mock project location 2',
					pageURL: '/projects/mock case reference 2',
					projectName: 'mock project name 2',
					stage: 'Acceptance (review of the application)'
				}
			]);
		});
	});
});
