const { getRedirectURL } = require('./get-redirect-url');

describe('pages/projects/register/_common/number/_utils/get-redirect-url', () => {
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
				let redirectURL;

				beforeEach(() => {
					query.mode = 'edit';
					redirectURL = getRedirectURL(session, caseRef, query);
				});

				it('should return the register agent check answers page', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				let redirectURL;

				beforeEach(() => {
					redirectURL = getRedirectURL(session, caseRef, query);
				});

				it('should return the register agent representing who page', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/agent/who-representing');
				});
			});
		});

		describe('When the user has previously selected registering for myself', () => {
			beforeEach(() => {
				session.typeOfParty = 'myself';
			});

			describe('and the user is in edit mode', () => {
				let redirectURL;

				beforeEach(() => {
					query.mode = 'edit';
					redirectURL = getRedirectURL(session, caseRef, query);
				});

				it('should return the register myself check answers page', () => {
					expect(redirectURL).toEqual('/projects/mock-case-ref/register/myself/check-answers');
				});
			});

			describe('and the user is NOT in edit mode', () => {
				let redirectURL;

				beforeEach(() => {
					redirectURL = getRedirectURL(session, caseRef, query);
				});

				it('should return the register myself about project page', () => {
					expect(redirectURL).toEqual(
						'/projects/mock-case-ref/register/myself/tell-us-about-project'
					);
				});
			});
		});

		describe('When the user has previously selected registering for organisation', () => {
			beforeEach(() => {
				session.typeOfParty = 'organisation';
			});

			describe('and the user is in edit mode', () => {
				let redirectURL;

				beforeEach(() => {
					query.mode = 'edit';
					redirectURL = getRedirectURL(session, caseRef, query);
				});

				it('should return the register organisation check answers page', () => {
					expect(redirectURL).toEqual(
						'/projects/mock-case-ref/register/organisation/check-answers'
					);
				});
			});

			describe('and the user is NOT in edit mode', () => {
				let redirectURL;

				beforeEach(() => {
					redirectURL = getRedirectURL(session, caseRef, query);
				});

				it('should return the register organisation about project page', () => {
					expect(redirectURL).toEqual(
						'/projects/mock-case-ref/register/organisation/tell-us-about-project'
					);
				});
			});
		});
	});
});
