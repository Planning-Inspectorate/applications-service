const { getRegisterMyselfNameURL } = require('./get-register-myself-name-url');

describe('pages/projects/register/myself/name/_utils/get-register-myself-name-url', () => {
	describe('#getRegisterMyselfNameURL', () => {
		describe('When getting the register myself name URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfNameURL = getRegisterMyselfNameURL();
				it('should return the register myself name URL with the route parameters', () => {
					expect(registerMyselfNameURL).toEqual('/projects/:case_ref/register/myself/full-name');
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfNameURL = getRegisterMyselfNameURL('mock-case-reference');
				it('should return the register myself name URL with the case reference', () => {
					expect(registerMyselfNameURL).toEqual(
						'/projects/mock-case-reference/register/myself/full-name'
					);
				});
			});
		});
	});
});
