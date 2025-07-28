const {
	getRegisterAgentAlreadyRegisteredURL
} = require('./get-register-agent-already-registered-url');

describe('pages/projects/register/agent/already-registered/_utils/get-register-agent-already-registered-url', () => {
	describe('#getRegisterAgentAlreadyRegisteredURL', () => {
		describe('When getting the register agent already registered URL', () => {
			describe('and a case reference is not provided', () => {
				const url = getRegisterAgentAlreadyRegisteredURL();
				it('should return the route with route parameters', () => {
					expect(url).toEqual('/projects/:case_ref/register/agent/already-registered');
				});
			});
			describe('and a case reference is provided', () => {
				const url = getRegisterAgentAlreadyRegisteredURL('mock-case-reference');
				it('should return the full URL with the case reference', () => {
					expect(url).toEqual('/projects/mock-case-reference/register/agent/already-registered');
				});
			});
		});
	});
});
