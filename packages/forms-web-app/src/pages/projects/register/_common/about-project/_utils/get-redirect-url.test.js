const { getRedirectURL } = require('./get-redirect-url');

describe('pages/projects/register/_common/about-project/_utils/get-redirect-url', () => {
	describe('#getRedirectURL', () => {
		let session;
		const caseRef = 'mock-case-ref';
		let query;

		beforeEach(() => {
			session = {};
			query = {};
		});

		describe('When the user has previously selected registering for agent', () => {
			beforeEach(() => {
				session.typeOfParty = 'behalf';
			});

			describe('and the user is in edit mode', () => {
				beforeEach(() => {
					query.mode = 'edit';
				});

				it('should return the register agent check answers page', () => {
					const redirectURL = getRedirectURL(session, caseRef, query);
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				it('should return the register agent AI declaration page', () => {
					const redirectURL = getRedirectURL(session, caseRef, query);
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/ai-declaration');
				});
			});
		});

		describe('When the user has previously selected registering for myself', () => {
			beforeEach(() => {
				session.typeOfParty = 'myself';
			});

			describe('and the user is in edit mode', () => {
				beforeEach(() => {
					query.mode = 'edit';
				});

				it('should return the register myself check answers page', () => {
					const redirectURL = getRedirectURL(session, caseRef, query);
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/myself/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				it('should return the register myself AI declaration page', () => {
					const redirectURL = getRedirectURL(session, caseRef, query);
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/myself/ai-declaration');
				});
			});
		});

		describe('When the user has previously selected registering for organisation', () => {
			beforeEach(() => {
				session.typeOfParty = 'organisation';
			});

			describe('and the user is in edit mode', () => {
				beforeEach(() => {
					query.mode = 'edit';
				});

				it('should return the register organisation check answers page', () => {
					const redirectURL = getRedirectURL(session, caseRef, query);
					expect(redirectURL).toEqual(
						'/projects/mock-case-ref/register/organisation/check-answers'
					);
				});
			});

			describe('and the user is NOT in edit mode', () => {
				it('should return the register organisation AI declaration page', () => {
					const redirectURL = getRedirectURL(session, caseRef, query);
					expect(redirectURL).toEqual(
						'/projects/mock-case-ref/register/organisation/ai-declaration'
					);
				});
			});
		});
	});
});
