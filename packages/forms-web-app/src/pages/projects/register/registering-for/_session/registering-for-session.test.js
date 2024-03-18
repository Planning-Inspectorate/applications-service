const {
	getRegisteringForAgentSession,
	setRegisteringForAgentSession,
	getRegisteringForMyselfSession,
	setRegisteringForMyselfSession,
	getRegisteringForOrganisationSession,
	setRegisteringForOrganisationSession
} = require('./registering-for-session');

describe('pages/projects/register/registering-for/_session/registering-for-session', () => {
	describe('#getRegisteringForAgentSession', () => {
		const session = {
			behalfRegdata: 'mock registering for agent value'
		};
		const registeringForAgentSessionValue = getRegisteringForAgentSession(session);
		it('should get the registering for agent value from the session', () => {
			expect(registeringForAgentSessionValue).toEqual('mock registering for agent value');
		});
	});

	describe('#setRegisteringForAgentSession', () => {
		const session = {};
		setRegisteringForAgentSession(session);
		it('should set the registering for agent data to the session', () => {
			expect(session).toEqual({
				behalfRegdata: {
					behalf: 'you',
					case_ref: null,
					representee: {
						address: { country: null, line1: null, line2: null, line3: null, postcode: null },
						email: null,
						'full-name': null,
						'over-18': null,
						telephone: null
					},
					representing: null,
					representor: {
						address: { country: null, line1: null, line2: null, line3: null, postcode: null },
						email: null,
						'full-name': null,
						'organisation-name': null,
						'over-18': null,
						telephone: null
					}
				}
			});
		});
	});

	describe('#getRegisteringForMyselfSession', () => {
		const session = {
			mySelfRegdata: 'mock registering for myself value'
		};
		const registeringForMyselfSessionValue = getRegisteringForMyselfSession(session);
		it('should get the registering for myself value from the session', () => {
			expect(registeringForMyselfSessionValue).toEqual('mock registering for myself value');
		});
	});

	describe('#setRegisteringForMyselfSession', () => {
		const session = {};
		setRegisteringForMyselfSession(session);
		it('should set the registering for myself data to the session', () => {
			expect(session).toEqual({
				mySelfRegdata: {
					address: { country: null, line1: null, line2: null, line3: null, postcode: null },
					behalf: 'me',
					case_ref: null,
					email: null,
					'full-name': null,
					'over-18': null,
					telephone: null
				}
			});
		});
	});

	describe('#getRegisteringForOrganisationSession', () => {
		const session = {
			orgRegdata: 'mock registering for organisation value'
		};
		const registeringForOrganisationSessionValue = getRegisteringForOrganisationSession(session);
		it('should get the registering for organisation value from the session', () => {
			expect(registeringForOrganisationSessionValue).toEqual(
				'mock registering for organisation value'
			);
		});
	});

	describe('#setRegisteringForOrganisationSession', () => {
		const session = {};
		setRegisteringForOrganisationSession(session);
		it('should set the registering for organisation data to the session', () => {
			expect(session).toEqual({
				orgRegdata: {
					address: { country: null, line1: null, line2: null, line3: null, postcode: null },
					behalf: 'them',
					case_ref: null,
					email: null,
					'full-name': null,
					'organisation-name': null,
					'over-18': null,
					role: null,
					telephone: null
				}
			});
		});
	});
});
