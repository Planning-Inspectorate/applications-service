const { getRegisterOrganisationJobTitleURL } = require('./get-register-organisation-job-title-url');

describe('pages/projects/register/organisation/job-title/_utils/get-register-organisation-job-title-url', () => {
	describe('#getRegisterOrganisationJobTitleURL', () => {
		describe('When getting the register organisation job title URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationJobTitleURL = getRegisterOrganisationJobTitleURL();
				it('should return the register organisation job title URL with the route parameters', () => {
					expect(registerOrganisationJobTitleURL).toEqual(
						'/projects/:case_ref/register/organisation/what-job-title-or-role'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationJobTitleURL =
					getRegisterOrganisationJobTitleURL('mock-case-reference');
				it('should return the register organisation job title URL with the case reference', () => {
					expect(registerOrganisationJobTitleURL).toEqual(
						'/projects/mock-case-reference/register/organisation/what-job-title-or-role'
					);
				});
			});
		});
	});
});
