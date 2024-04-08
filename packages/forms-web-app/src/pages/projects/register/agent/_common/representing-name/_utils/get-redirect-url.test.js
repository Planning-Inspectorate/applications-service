const { getRedirectURL } = require('./get-redirect-url');

describe('pages/projects/register/agent/_common/representing-name/_utils/get-redirect-url', () => {
	describe('#getRedirectURL', () => {
		const caseRef = 'mock-case-ref';
		describe('When the user has previously selected representing person', () => {
			const session = { behalfRegdata: { representing: 'person' } };

			describe('and the user is in edit mode', () => {
				const query = { mode: 'edit' };

				const redirectURL = getRedirectURL(session, caseRef, query);

				it('should return the register agent check answers url', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				const query = {};

				const redirectURL = getRedirectURL(session, caseRef, query);

				it('should return the register agent are they over 18 url', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/are-they-18-over');
				});
			});
		});

		describe('When the user has previously selected representing family', () => {
			const session = { behalfRegdata: { representing: 'family' } };
			describe('and the user is in edit mode', () => {
				const query = { mode: 'edit' };

				const redirectURL = getRedirectURL(session, caseRef, query);

				it('should return the register agent check answers url', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				const query = {};

				const redirectURL = getRedirectURL(session, caseRef, query);

				it('should return the register agent are they over 18 url', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/are-they-18-over');
				});
			});
		});

		describe('When the user has previously selected representing organisation', () => {
			const session = { behalfRegdata: { representing: 'organisation' } };
			describe('and the user is in edit mode', () => {
				const query = { mode: 'edit' };

				const redirectURL = getRedirectURL(session, caseRef, query);

				it('should return the register agent check answers url', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				const query = {};

				const redirectURL = getRedirectURL(session, caseRef, query);

				it('should return the register agent their email url', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/their-email-address');
				});
			});
		});
	});
});
