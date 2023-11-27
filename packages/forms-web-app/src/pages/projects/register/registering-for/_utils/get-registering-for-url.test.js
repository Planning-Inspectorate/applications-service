const { getRegisteringForURL } = require('./get-registering-for-url');

describe('pages/projects/register/registering-for/_utils/get-registering-for-url', () => {
	describe('#getRegisteringForURL', () => {
		describe('When getting the registering for URL', () => {
			describe('and a case reference is not provided', () => {
				const registeringForURL = getRegisteringForURL();
				it('should return the registering for URL with the route parameters', () => {
					expect(registeringForURL).toEqual('/projects/:case_ref/register/who-registering-for');
				});
			});
			describe('and a case reference is provided', () => {
				const registeringForURL = getRegisteringForURL('mock-case-reference');
				it('should return the registering for URL with the case reference', () => {
					expect(registeringForURL).toEqual(
						'/projects/mock-case-reference/register/who-registering-for'
					);
				});
			});
		});
	});
});
