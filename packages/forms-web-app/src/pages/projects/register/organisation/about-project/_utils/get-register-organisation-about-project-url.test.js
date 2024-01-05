const {
	getRegisterOrganisationAboutProjectURL
} = require('./get-register-organisation-about-project-url');

describe('pages/projects/register/organisation/about-project/_utils/get-register-organisation-about-project-url', () => {
	describe('#getRegisterOrganisationAboutProjectURL', () => {
		describe('When getting the register organisation about project URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationAboutProjectURL = getRegisterOrganisationAboutProjectURL();
				it('should return the register organisation about project URL with the route parameters', () => {
					expect(registerOrganisationAboutProjectURL).toEqual(
						'/projects/:case_ref/register/organisation/tell-us-about-project'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationAboutProjectURL =
					getRegisterOrganisationAboutProjectURL('mock-case-reference');
				it('should return the register organisation about project URL with the case reference', () => {
					expect(registerOrganisationAboutProjectURL).toEqual(
						'/projects/mock-case-reference/register/organisation/tell-us-about-project'
					);
				});
			});
		});
	});
});
