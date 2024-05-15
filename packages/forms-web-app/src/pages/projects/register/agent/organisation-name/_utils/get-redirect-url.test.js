const { getRedirectURL } = require('./get-redirect-url');

describe('pages/projects/register/agent/organisation-name/_utils/get-redirect-url', () => {
	describe('#getRedirectURL', () => {
		describe('When in edit mode', () => {
			const caseRef = 'mock-case-ref';
			const query = {
				mode: 'edit'
			};
			const redirectURL = getRedirectURL(caseRef, query);
			it('should return the register agent check answers url', () => {
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
			});
		});

		describe('When NOT in edit mode', () => {
			const caseRef = 'mock-case-ref';
			const query = {};
			const redirectURL = getRedirectURL(caseRef, query);
			it('should return the register agent email url', () => {
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/email-address');
			});
		});
	});
});
