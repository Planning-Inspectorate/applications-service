const { getRegisterMyselfAreYou18URL } = require('./get-register-myself-are-you-18-url');

describe('pages/projects/register/myself/are-you-18/_utils/get-register-myself-are-you-18-url', () => {
	describe('#getRegisterMyselfAreYou18URL', () => {
		describe('When getting the register myself are you 18 URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfAreYou18URL = getRegisterMyselfAreYou18URL();
				it('should return the register myself are you 18 URL with the route parameters', () => {
					expect(registerMyselfAreYou18URL).toEqual(
						'/projects/:case_ref/register/myself/are-you-18-over'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfAreYou18URL = getRegisterMyselfAreYou18URL('mock-case-reference');
				it('should return the register myself are you 18 URL with the case reference', () => {
					expect(registerMyselfAreYou18URL).toEqual(
						'/projects/mock-case-reference/register/myself/are-you-18-over'
					);
				});
			});
		});
	});
});
