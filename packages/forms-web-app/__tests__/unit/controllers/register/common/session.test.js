const { getSession } = require('../../../../../src/controllers/register/common/session');
describe('#registrationSession', () => {
	describe('#getSession', () => {
		describe('When getting the session for the registration journey', () => {
			describe('and the key is "agent"', () => {
				const mockSession = { behalfRegdata: { representor: { message: 'mock agent session' } } };
				const key = 'agent';
				const response = getSession(mockSession, key);
				it('should get the session from the "agent" session key with the representor object', () => {
					expect(response).toEqual({ message: 'mock agent session' });
				});
			});
			describe('and the key is "myself"', () => {
				const mockSession = { mySelfRegdata: { message: 'mock myself session' } };
				const key = 'myself';
				const response = getSession(mockSession, key);
				it('should get the session from the "myself" session key', () => {
					expect(response).toEqual({ message: 'mock myself session' });
				});
			});
			describe('and the key is "organisation"', () => {
				const mockSession = { orgRegdata: { message: 'mock organisation session' } };
				const key = 'organisation';
				const response = getSession(mockSession, key);
				it('should get the session from the "organisation" session key', () => {
					expect(response).toEqual({ message: 'mock organisation session' });
				});
			});
		});
	});
});
