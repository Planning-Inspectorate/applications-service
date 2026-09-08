const { getRedirectURL } = require('./get-redirect-url');

describe('pages/projects/register/_common/ai-declaration/_utils/get-redirect-url', () => {
	describe('#getRedirectURL', () => {
		let session;
		const caseRef = 'mock-case-ref';

		beforeEach(() => {
			session = {};
		});

		describe('When the user has previously selected registering for an agent', () => {
			beforeEach(() => {
				session.typeOfParty = 'behalf';
			});

			it('should return the register agent check your answers page', () => {
				const redirectURL = getRedirectURL(session, caseRef);
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
			});
		});

		describe('When the user has previously selected registering for myself', () => {
			beforeEach(() => {
				session.typeOfParty = 'myself';
			});

			it('should return the register myself check your answers page', () => {
				const redirectURL = getRedirectURL(session, caseRef);
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/myself/check-answers');
			});
		});

		describe('When the user has previously selected registering for an organisation', () => {
			beforeEach(() => {
				session.typeOfParty = 'organisation';
			});

			it('should return the register organisation check your answers page', () => {
				const redirectURL = getRedirectURL(session, caseRef);
				expect(redirectURL).toEqual('/projects/mock-case-ref/register/organisation/check-answers');
			});
		});
	});
});
