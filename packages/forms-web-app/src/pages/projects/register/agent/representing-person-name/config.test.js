const { registerAgentRepresentingPersonNameRoute } = require('./config');

describe('pages/projects/register/agent/representing-person-name/config', () => {
	describe('#registerAgentRepresentingPersonNameRoute', () => {
		it('should return the register agent representing person name route', () => {
			expect(registerAgentRepresentingPersonNameRoute).toEqual('name-person-representing');
		});
	});
});
