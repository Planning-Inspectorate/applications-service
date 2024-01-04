const { getRegisterAgentCheckAnswersURL } = require('./get-register-agent-check-answers-url');

describe('pages/projects/register/agent/check-answers/_utils/get-register-agent-check-answers-url', () => {
	describe('#getRegisterAgentCheckAnswersURL', () => {
		describe('When getting the register agent check answers URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentCheckAnswersURL = getRegisterAgentCheckAnswersURL();
				it('should return the register agent check answers URL with the route parameters', () => {
					expect(registerAgentCheckAnswersURL).toEqual(
						'/projects/:case_ref/register/agent/check-answers'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentCheckAnswersURL = getRegisterAgentCheckAnswersURL('mock-case-reference');
				it('should return the register agent check answers URL with the case reference', () => {
					expect(registerAgentCheckAnswersURL).toEqual(
						'/projects/mock-case-reference/register/agent/check-answers'
					);
				});
			});
		});
	});
});
