const {
	getRegisterAgentOrganisationNameSession,
	setRegisterAgentOrganisationNameSession
} = require('./register-agent-organisation-name-session');

describe('pages/projects/register/agent/organisation-name/_session/register-agent-organisation-name-session', () => {
	describe('#getRegisterAgentOrganisationNameSession', () => {
		const session = {
			behalfRegdata: {
				representor: {
					'organisation-name': 'mock session organisation name value'
				}
			}
		};

		it('should get the register agent organisation name value from the session', () => {
			expect(getRegisterAgentOrganisationNameSession(session)).toEqual(
				'mock session organisation name value'
			);
		});
	});

	describe('#setRegisterAgentOrganisationNameSession', () => {
		const session = {
			behalfRegdata: {
				representor: {}
			}
		};
		const value = 'mock session organisation name value';

		setRegisterAgentOrganisationNameSession(session, value);

		it('should set the register agent organisation name value to the session', () => {
			expect(session).toEqual({
				behalfRegdata: {
					representor: { 'organisation-name': 'mock session organisation name value' }
				}
			});
		});
	});
});
