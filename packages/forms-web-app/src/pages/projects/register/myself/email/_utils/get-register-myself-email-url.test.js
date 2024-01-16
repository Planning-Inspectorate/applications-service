const { getRegisterMyselfEmailURL } = require('./get-register-myself-email-url');

describe('pages/projects/register/myself/email/_utils/get-register-myself-email-url', () => {
	describe('#getRegisterMyselfEmailURL', () => {
		describe('When getting the register myself email URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfEmailURL = getRegisterMyselfEmailURL();
				it('should return the register myself email URL with the route parameters', () => {
					expect(registerMyselfEmailURL).toEqual(
						'/projects/:case_ref/register/myself/email-address'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfEmailURL = getRegisterMyselfEmailURL('mock-case-reference');
				it('should return the register myself email URL with the case reference', () => {
					expect(registerMyselfEmailURL).toEqual(
						'/projects/mock-case-reference/register/myself/email-address'
					);
				});
			});
		});
	});
});
