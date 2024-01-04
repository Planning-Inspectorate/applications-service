const { getRegisterMyselfCheckAnswersURL } = require('./get-register-myself-check-answers-url');

describe('pages/projects/register/myself/check-answers/_utils/get-register-myself-check-answers-url', () => {
	describe('#getRegisterMyselfCheckAnswersURL', () => {
		describe('When getting the register myself check answers URL', () => {
			describe('and a case reference is not provided', () => {
				const registerMyselfCheckAnswersURL = getRegisterMyselfCheckAnswersURL();
				it('should return the register myself check answers URL with the route parameters', () => {
					expect(registerMyselfCheckAnswersURL).toEqual(
						'/projects/:case_ref/register/myself/check-answers'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerMyselfCheckAnswersURL =
					getRegisterMyselfCheckAnswersURL('mock-case-reference');
				it('should return the register myself check answers URL with the case reference', () => {
					expect(registerMyselfCheckAnswersURL).toEqual(
						'/projects/mock-case-reference/register/myself/check-answers'
					);
				});
			});
		});
	});
});
