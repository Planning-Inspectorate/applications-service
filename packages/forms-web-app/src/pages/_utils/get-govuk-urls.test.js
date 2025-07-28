const { getGovUkUrls } = require('./get-govuk-urls');

jest.mock('../../../src/config', () => {
	return {
		govUK: {
			developmentConsent: 'URL 1',
			developmentConsentWelsh: 'Welsh URL 1',
			developmentConsentAndAdvice: 'URL 2',
			developmentConsentAndAdviceWelsh: 'Welsh URL 2',
			planningGuidance: 'URL 3',
			advicePages: 'URL 4',
			advicePagesWelsh: 'Welsh URL 4',
			nationalPolicyStatements: 'URL 5',
			nationalPolicyStatementsWelsh: 'Welsh URL 5'
		}
	};
});

describe('pages/_utils/get-govuk-urls', () => {
	it('returns correct URLs - en (default)', () => {
		expect(getGovUkUrls()).toEqual({
			developmentConsentUrl: 'URL 1',
			developmentConsentAndAdviceUrl: 'URL 2',
			planningGuidanceUrl: 'URL 3',
			advicePagesUrl: 'URL 4',
			nationalPolicyStatementsUrl: 'URL 5'
		});
	}),
		it('returns correct URLs - cy', () => {
			expect(getGovUkUrls('cy')).toEqual({
				developmentConsentUrl: 'Welsh URL 1',
				developmentConsentAndAdviceUrl: 'Welsh URL 2',
				planningGuidanceUrl: 'URL 3',
				advicePagesUrl: 'Welsh URL 4',
				nationalPolicyStatementsUrl: 'Welsh URL 5'
			});
		});
});
