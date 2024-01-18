const { getRegisterMyselfAboutProjectURL } = require('./get-register-myself-about-project-url');

describe('pages/projects/register/myself/about-project/_utils/get-register-myself-about-project-url', () => {
	describe('#getRegisterMyselfAboutProjectURL', () => {
		describe('When getting the register myself about project URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfAboutProjectURL = getRegisterMyselfAboutProjectURL();
				it('should return the register myself about project URL with the route parameters', () => {
					expect(registerMyselfAboutProjectURL).toEqual(
						'/projects/:case_ref/register/myself/tell-us-about-project'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfAboutProjectURL =
					getRegisterMyselfAboutProjectURL('mock-case-reference');
				it('should return the register myself about project URL with the case reference', () => {
					expect(registerMyselfAboutProjectURL).toEqual(
						'/projects/mock-case-reference/register/myself/tell-us-about-project'
					);
				});
			});
		});
	});
});
