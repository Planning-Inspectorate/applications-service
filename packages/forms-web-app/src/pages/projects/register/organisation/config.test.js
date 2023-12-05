const { registerOrganisationRoute } = require('./config');

describe('pages/projects/register/organisation/config', () => {
	describe('#registerOrganisationRoute', () => {
		it('should return the register organisation route', () => {
			expect(registerOrganisationRoute).toEqual('organisation');
		});
	});
});
