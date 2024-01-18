const {
	getRegisterAgentAreThey18URL
} = require('../../../agent/are-they-18/utils/get-register-agent-are-they-18-url');

describe('pages/projects/register/agent/are-they-18/_utils/get-register-agent-are-they-18-url', () => {
	describe('#getRegisterAgentAreThey18URL', () => {
		describe('When getting the register agent are they 18 URL', () => {
			describe('and a case reference is not provided', () => {
				const registerAgentAreThey18URL = getRegisterAgentAreThey18URL();
				it('should return the register agent are they 18 URL with the route parameters', () => {
					expect(registerAgentAreThey18URL).toEqual(
						'/projects/:case_ref/register/agent/are-they-18-over'
					);
				});
			});
			describe('and a case reference is provided', () => {
				const registerAgentAreThey18URL = getRegisterAgentAreThey18URL('mock-case-reference');
				it('should return the register agent are they 18 URL with the case reference', () => {
					expect(registerAgentAreThey18URL).toEqual(
						'/projects/mock-case-reference/register/agent/are-they-18-over'
					);
				});
			});
		});
	});
});
