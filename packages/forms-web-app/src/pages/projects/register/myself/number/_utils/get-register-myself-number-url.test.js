const { getRegisterMyselfNumberURL } = require('./get-register-myself-number-url');

describe('pages/projects/register/myself/number/_utils/get-register-myself-number-url', () => {
	describe('#getRegisterMyselfNumberURL', () => {
		describe('When getting the register myself number URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfNumberURL = getRegisterMyselfNumberURL();
				it('should return the register myself number URL with the route parameters', () => {
					expect(registerMyselfNumberURL).toEqual(
						'/projects/:case_ref/register/myself/telephone-number'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfNumberURL = getRegisterMyselfNumberURL('mock-case-reference');
				it('should return the register myself number URL with the case reference', () => {
					expect(registerMyselfNumberURL).toEqual(
						'/projects/mock-case-reference/register/myself/telephone-number'
					);
				});
			});
		});
	});
});
