const { registerOrganisationJobTitleRoute } = require('./config');

describe('pages/projects/register/organisation/job-title/config', () => {
	describe('#registerOrganisationJobTitleRoute', () => {
		it('should return the register organisation job title route', () => {
			expect(registerOrganisationJobTitleRoute).toEqual('what-job-title-or-role');
		});
	});
});
