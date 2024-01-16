const {
	getRegisterOrganisationCheckAnswersURL
} = require('./get-register-organisation-check-answers-url');

describe('pages/projects/register/organisation/check-answers/_utils/get-register-organisation-check-answers-url', () => {
	describe('#getRegisterOrganisationCheckAnswersURL', () => {
		describe('When getting the register organisation check answers URL', () => {
			describe('and a case reference is not provided', () => {
				const registerOrganisationCheckAnswersURL = getRegisterOrganisationCheckAnswersURL();
				it('should return the register organisation check answers URL with the route parameters', () => {
					expect(registerOrganisationCheckAnswersURL).toEqual(
						'/projects/:case_ref/register/organisation/check-answers'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerOrganisationCheckAnswersURL =
					getRegisterOrganisationCheckAnswersURL('mock-case-reference');
				it('should return the register organisation check answers URL with the case reference', () => {
					expect(registerOrganisationCheckAnswersURL).toEqual(
						'/projects/mock-case-reference/register/organisation/check-answers'
					);
				});
			});
		});
	});
});
