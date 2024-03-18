const { getRegisteringForRedirectURL } = require('./get-registering-for-redirect-url');

describe('pages/projects/register/registering-for/_utils/get-registering-for-redirect-url', () => {
	describe('#getRegisteringForRedirectURL', () => {
		describe('When getting the next page and edit url for the registering for redirect url', () => {
			describe(`and the user has selected 'behalf'`, () => {
				let registeringForRedirectURL;

				const caseRef = 'mock-case-ref';
				const selectedOption = 'behalf';

				beforeEach(() => {
					registeringForRedirectURL = getRegisteringForRedirectURL(caseRef, selectedOption);
				});

				it('should return the next page and edit url for the agent journey', () => {
					expect(registeringForRedirectURL).toEqual({
						editURL: '/projects/mock-case-ref/register/agent/check-answers',
						nextURL: '/projects/mock-case-ref/register/agent/full-name'
					});
				});
			});

			describe(`and the user has selected 'myself'`, () => {
				let registeringForRedirectURL;

				const caseRef = 'mock-case-ref';
				const selectedOption = 'myself';

				beforeEach(() => {
					registeringForRedirectURL = getRegisteringForRedirectURL(caseRef, selectedOption);
				});

				it('should return the next page and edit url for the myself journey', () => {
					expect(registeringForRedirectURL).toEqual({
						editURL: '/projects/mock-case-ref/register/myself/check-answers',
						nextURL: '/projects/mock-case-ref/register/myself/full-name'
					});
				});
			});

			describe(`and the user has selected 'organisation'`, () => {
				let registeringForRedirectURL;

				const caseRef = 'mock-case-ref';
				const selectedOption = 'organisation';

				beforeEach(() => {
					registeringForRedirectURL = getRegisteringForRedirectURL(caseRef, selectedOption);
				});

				it('should return the next page and edit url for the organisation journey', () => {
					expect(registeringForRedirectURL).toEqual({
						editURL: '/projects/mock-case-ref/register/organisation/check-answers',
						nextURL: '/projects/mock-case-ref/register/organisation/full-name'
					});
				});
			});
		});
	});
});
