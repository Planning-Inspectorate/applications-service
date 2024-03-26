const {
	registerAgentRepresentingWhoRoute,
	registerAgentRepresentingWhoOptions
} = require('./config');

describe('pages/projects/register/agent/representing-who/config', () => {
	describe('#registerAgentRepresentingWhoRoute', () => {
		it('should return the register agent representing who route', () => {
			expect(registerAgentRepresentingWhoRoute).toEqual('who-representing');
		});
	});

	describe('#registerAgentRepresentingWhoOptions', () => {
		it('should return the register agent representing who options', () => {
			expect(registerAgentRepresentingWhoOptions).toEqual({
				family: 'family',
				organisation: 'organisation',
				person: 'person'
			});
		});
	});
});
