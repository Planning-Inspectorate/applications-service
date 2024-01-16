const { getRegisterMyselfURL } = require('./get-register-myself-url');

describe('pages/projects/register/myself/_utils/get-register-myself-url', () => {
	describe('#getRegisterMyselfURL', () => {
		describe('When getting the register myself URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfURL = getRegisterMyselfURL();
				it('should return the register myself URL with the route parameters', () => {
					expect(registerMyselfURL).toEqual('/projects/:case_ref/register/myself');
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfURL = getRegisterMyselfURL('mock-case-reference');
				it('should return the register myself URL with the case reference', () => {
					expect(registerMyselfURL).toEqual('/projects/mock-case-reference/register/myself');
				});
			});
		});
	});
});
