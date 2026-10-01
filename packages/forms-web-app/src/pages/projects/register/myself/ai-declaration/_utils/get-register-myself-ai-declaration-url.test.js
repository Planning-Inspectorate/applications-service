const { getRegisterMyselfAiDeclarationURL } = require('./get-register-myself-ai-declaration-url');

describe('pages/projects/register/myself/ai-declaration/_utils/get-register-myself-ai-declaration-url', () => {
	describe('#getRegisterMyselfAiDeclarationURL', () => {
		describe('When getting the register myself AI declaration URL', () => {
			describe('and a case reference is NOT provided', () => {
				const registerMyselfAiDeclarationURL = getRegisterMyselfAiDeclarationURL();
				it('should return the register myself AI declaration URL with the route parameters', () => {
					expect(registerMyselfAiDeclarationURL).toEqual(
						'/projects/:case_ref/register/myself/ai-declaration'
					);
				});
			});

			describe('and a case reference is provided', () => {
				const registerMyselfAiDeclarationURL =
					getRegisterMyselfAiDeclarationURL('mock-case-reference');
				it('should return the register myself AI declaration URL with the case reference', () => {
					expect(registerMyselfAiDeclarationURL).toEqual(
						'/projects/mock-case-reference/register/myself/ai-declaration'
					);
				});
			});
		});
	});
});
