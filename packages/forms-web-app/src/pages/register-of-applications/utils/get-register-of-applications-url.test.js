const { getRegisterOfApplicationsURL } = require('./get-register-of-applications-url');

describe('pages/register-of-applications/utils/get-register-of-applications-url', () => {
	describe('#getRegisterOfApplicationsURL', () => {
		const registerOfApplicationsURL = getRegisterOfApplicationsURL();
		it('should return the register of applications URL', () => {
			expect(registerOfApplicationsURL).toEqual('/register-of-applications');
		});
	});
});
