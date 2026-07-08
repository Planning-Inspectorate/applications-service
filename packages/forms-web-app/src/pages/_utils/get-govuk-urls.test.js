const { getGovUkUrls } = require('./get-govuk-urls');

jest.mock('../../../src/config', () => {
	return {
		govUK: {
			developmentConsent: 'URL 1',
			developmentConsentWelsh: 'Welsh URL 1',
			developmentConsentAndAdvice: 'URL 2',
			developmentConsentAndAdviceWelsh: 'Welsh URL 2',
			commonTerms: 'URL 3',
			commonTermsWelsh: 'Welsh URL 3',
			planningGuidance: 'URL 4',
			advicePages: 'URL 5',
			advicePagesWelsh: 'Welsh URL 5',
			nationalPolicyStatements: 'URL 6',
			nationalPolicyStatementsWelsh: 'Welsh URL 6'
		}
	};
});

describe('pages/_utils/get-govuk-urls', () => {
	it('returns correct URLs - en (default)', () => {
		expect(getGovUkUrls()).toEqual({
			developmentConsentUrl: 'URL 1',
			developmentConsentAndAdviceUrl: 'URL 2',
			commonTermsUrl: 'URL 3',
			planningGuidanceUrl: 'URL 4',
			advicePagesUrl: 'URL 5',
			nationalPolicyStatementsUrl: 'URL 6'
		});
	}),
		it('returns correct URLs - cy', () => {
			expect(getGovUkUrls('cy')).toEqual({
				developmentConsentUrl: 'Welsh URL 1',
				developmentConsentAndAdviceUrl: 'Welsh URL 2',
				commonTermsUrl: 'Welsh URL 3',
				planningGuidanceUrl: 'URL 4',
				advicePagesUrl: 'Welsh URL 5',
				nationalPolicyStatementsUrl: 'Welsh URL 6'
			});
		});
});
