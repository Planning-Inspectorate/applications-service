const { registerOrganisationOrgNameRoute } = require('./config');

describe('pages/projects/register/organisation/organisation-name/config', () => {
	describe('#registerOrganisationOrgNameRoute', () => {
		it('should return the register organisation org name route', () => {
			expect(registerOrganisationOrgNameRoute).toEqual('name-of-organisation-or-charity');
		});
	});
});
