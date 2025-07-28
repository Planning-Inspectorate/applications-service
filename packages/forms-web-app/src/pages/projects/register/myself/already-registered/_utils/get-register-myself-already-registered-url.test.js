const {
	getRegisterMyselfAlreadyRegisteredURL
} = require('./get-register-myself-already-registered-url');

describe('pages/projects/register/myself/already-registered/_utils/get-register-myself-already-registered-url', () => {
	describe('#getRegisterMyselfAlreadyRegisteredURL', () => {
		describe('When getting the register myself already registered URL', () => {
			describe('and a case reference is not provided', () => {
				const url = getRegisterMyselfAlreadyRegisteredURL();
				it('should return the route with route parameters', () => {
					expect(url).toEqual('/projects/:case_ref/register/myself/already-registered');
				});
			});
			describe('and a case reference is provided', () => {
				const url = getRegisterMyselfAlreadyRegisteredURL('mock-case-reference');
				it('should return the full URL with the case reference', () => {
					expect(url).toEqual('/projects/mock-case-reference/register/myself/already-registered');
				});
			});
		});
	});
});
