const {
	getRegisterTypeOfPartySession,
	setRegisterTypeOfPartySession
} = require('./type-of-party-session');

describe('pages/projects/register/registering-for/_session/type-of-party-session', () => {
	describe('#getRegisterTypeOfPartySession', () => {
		const session = {
			typeOfParty: 'mock type of party session value'
		};
		const registerTypeOfPartySessionValue = getRegisterTypeOfPartySession(session);
		it('should get the type of party value from the session', () => {
			expect(registerTypeOfPartySessionValue).toEqual('mock type of party session value');
		});
	});

	describe('#setRegisterTypeOfPartySession', () => {
		const session = {};
		const typeOfParty = 'mock type of party session value';

		setRegisterTypeOfPartySession(session, typeOfParty);

		it('should set the type of party value to the session', () => {
			expect(session).toEqual({ typeOfParty: 'mock type of party session value' });
		});
	});
});
