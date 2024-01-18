const { getRegisterMyselfCompleteURL } = require('./get-register-myself-complete-url');

describe('pages/projects/register/myself/complete/_utils/get-register-myself-complete-url', () => {
	describe('#getRegisterMyselfCompleteURL', () => {
		describe('When getting the register myself complete URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfCompleteURL = getRegisterMyselfCompleteURL();
				it('should return the register myself complete URL with the route parameters', () => {
					expect(registerMyselfCompleteURL).toEqual(
						'/projects/:case_ref/register/myself/registration-complete'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfCompleteURL = getRegisterMyselfCompleteURL('mock-case-reference');
				it('should return the register myself complete URL with the case reference', () => {
					expect(registerMyselfCompleteURL).toEqual(
						'/projects/mock-case-reference/register/myself/registration-complete'
					);
				});
			});
		});
	});
});
