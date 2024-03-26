const { getRedirectURL } = require('./get-redirect-url');

describe('pages/projects/register/agent/their-telephone/_utils/get-redirect-url', () => {
	describe('#getRedirectURL', () => {
		const caseRef = 'mock-case-ref';

		describe('When the user is in edit mode', () => {
			const query = { mode: 'edit' };

			const redirectURL = getRedirectURL(caseRef, query);

			it('should return the register agent check answers url', () => {
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
			});
		});

		describe('When the user is NOT in edit mode', () => {
			const query = {};

			const redirectURL = getRedirectURL(caseRef, query);

			it('should return the register agent about project url', () => {
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/tell-us-about-project');
			});
		});
	});
});
