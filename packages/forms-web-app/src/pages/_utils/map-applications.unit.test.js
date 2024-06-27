const { mapApplications } = require('./map-applications');

const { getApplicationsFixture } = require('../_fixtures');

const { mockI18n } = require('../_mocks/i18n');

const i18n = mockI18n();

describe('_utils/map-applications', () => {
	describe('#mapApplications', () => {
		it('should take applications API response and returned correctly mapped data', () => {
			const result = mapApplications(i18n, getApplicationsFixture.data.applications);

			expect(result).toEqual([
				{
					applicant: 'EDF',
					applicationDate: '01 Jan 2018',
					decisionDate: '',
					location: 'Somerset - Monday PM 23/12',
					pageURL: '/projects/TR010001',
					projectName: 'Accessibility Test',
					stage: 'Examination'
				},
				{
					applicant: 'John Agent Burke',
					applicationDate: '',
					decisionDate: '',
					location: 'Bristol',
					pageURL: '/projects/TR023024',
					projectName: 'April 7 2020',
					stage: 'Pre-application'
				},
				{
					applicant: 'EDF',
					applicationDate: '01 Jan 2018',
					decisionDate: '',
					location: 'Somerset - cache test 03-02 15:44',
					pageURL: '/projects/tr033005',
					projectName: 'Azure Performance Test',
					stage: 'Acceptance (review of the application)'
				}
			]);
		});
	});
});
