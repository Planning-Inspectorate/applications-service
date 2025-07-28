const {
	getRegisterOrganisationAlreadyRegisteredURL
} = require('./get-register-organisation-already-registered-url');

describe('pages/projects/register/organisation/already-registered/_utils/get-register-organisation-already-registered-url', () => {
	describe('#getRegisterOrganisationAlreadyRegisteredURL', () => {
		describe('When getting the register organisation already registered URL', () => {
			describe('and a case reference is not provided', () => {
				const url = getRegisterOrganisationAlreadyRegisteredURL();
				it('should return the route with route parameters', () => {
					expect(url).toEqual('/projects/:case_ref/register/organisation/already-registered');
				});
			});
			describe('and a case reference is provided', () => {
				const url = getRegisterOrganisationAlreadyRegisteredURL('mock-case-reference');
				it('should return the full URL with the case reference', () => {
					expect(url).toEqual(
						'/projects/mock-case-reference/register/organisation/already-registered'
					);
				});
			});
		});
	});
});
