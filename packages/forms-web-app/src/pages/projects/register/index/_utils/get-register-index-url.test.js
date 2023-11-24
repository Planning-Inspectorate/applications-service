const { getRegisterIndexURL } = require('./get-register-index-url');

describe('pages/projects/register/index/_utils/get-register-index-url', () => {
	describe('#getRegisterIndexURL', () => {
		describe('When getting the register index URL', () => {
			describe('and a case reference is not provided', () => {
				const registerIndexURL = getRegisterIndexURL();
				it('should return the register index URL with the route parameters', () => {
					expect(registerIndexURL).toEqual('/projects/:case_ref/register/register-have-your-say');
				});
			});
			describe('and a case reference is provided', () => {
				const registerIndexURL = getRegisterIndexURL('mock-case-reference');
				it('should return the register index URL with the case reference', () => {
					expect(registerIndexURL).toEqual(
						'/projects/mock-case-reference/register/register-have-your-say'
					);
				});
			});
		});
	});
});
