const {
	getRegisterAgentRepresentingWhoSession,
	setRegisterAgentRepresentingWhoSession
} = require('./register-agent-representing-who-session');

describe('pages/projects/register/agent/representing-who/_session/register-agent-representing-who-session', () => {
	describe('#getRegisterAgentRepresentingWhoSession', () => {
		const session = {
			behalfRegdata: {
				representing: 'mock representing who session value'
			}
		};
		const registerAgentRepresentingWhoSessionValue =
			getRegisterAgentRepresentingWhoSession(session);

		it('should get the representing who value from the session', () => {
			expect(registerAgentRepresentingWhoSessionValue).toEqual(
				'mock representing who session value'
			);
		});
	});

	describe('#setRegisterAgentRepresentingWhoSession', () => {
		const session = { behalfRegdata: {} };
		const representingWho = 'mock representing who session value';

		setRegisterAgentRepresentingWhoSession(session, representingWho);

		it('should set the representing who value to the session', () => {
			expect(session).toEqual({
				behalfRegdata: { representing: 'mock representing who session value' }
			});
		});
	});
});
