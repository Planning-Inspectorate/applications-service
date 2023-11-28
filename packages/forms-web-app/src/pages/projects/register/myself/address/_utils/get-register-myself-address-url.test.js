const { getRegisterMyselfAddressURL } = require('./get-register-myself-address-url');

describe('pages/projects/register/myself/address/_utils/get-register-myself-address-url', () => {
	describe('#getRegisterMyselfAddressURL', () => {
		describe('When getting the register myself address URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfAddressURL = getRegisterMyselfAddressURL();
				it('should return the register myself address URL with the route parameters', () => {
					expect(registerMyselfAddressURL).toEqual('/projects/:case_ref/register/myself/address');
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfAddressURL = getRegisterMyselfAddressURL('mock-case-reference');
				it('should return the register myself address URL with the case reference', () => {
					expect(registerMyselfAddressURL).toEqual(
						'/projects/mock-case-reference/register/myself/address'
					);
				});
			});
		});
	});
});
