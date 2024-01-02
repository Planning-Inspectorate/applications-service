const { getRegisterMyselfDeclarationURL } = require('./get-register-myself-declaration-url');

describe('pages/projects/register/myself/declaration/_utils/get-register-myself-declaration-url', () => {
	describe('#getRegisterMyselfDeclarationURL', () => {
		describe('When getting the register myself declaration URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfDeclarationURL = getRegisterMyselfDeclarationURL();
				it('should return the register myself declaration URL with the route parameters', () => {
					expect(registerMyselfDeclarationURL).toEqual(
						'/projects/:case_ref/register/myself/declaration'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfDeclarationURL = getRegisterMyselfDeclarationURL('mock-case-reference');
				it('should return the register myself declaration URL with the case reference', () => {
					expect(registerMyselfDeclarationURL).toEqual(
						'/projects/mock-case-reference/register/myself/declaration'
					);
				});
			});
		});
	});
});
