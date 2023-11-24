const { getRegisterURL } = require('./get-register-url');

describe('pages/projects/register/_utils/get-register-url', () => {
	describe('#getRegisterURL', () => {
		describe('When getting the register URL', () => {
			describe('and a case reference is not provided', () => {
				const registerURL = getRegisterURL();
				it('should return the register URL with the route parameters', () => {
					expect(registerURL).toEqual('/projects/:case_ref/register');
				});
			});
			describe('and a case reference is provided', () => {
				const registerURL = getRegisterURL('mock-case-reference');
				it('should return the register URL with the case reference', () => {
					expect(registerURL).toEqual('/projects/mock-case-reference/register');
				});
			});
		});
	});
});
