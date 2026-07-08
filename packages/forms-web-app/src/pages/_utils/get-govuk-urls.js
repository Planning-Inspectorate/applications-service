const config = require('../../config');

const getGovUkUrls = (locale = 'en') => {
	const {
		developmentConsent,
		developmentConsentWelsh,
		developmentConsentAndAdvice,
		developmentConsentAndAdviceWelsh,
		commonTerms,
		commonTermsWelsh,
		nationalPolicyStatements,
		nationalPolicyStatementsWelsh,
		planningGuidance,
		advicePages,
		advicePagesWelsh
	} = config.govUK;

	return {
		developmentConsentUrl: getGovUkUrl(locale, developmentConsent, developmentConsentWelsh),
		developmentConsentAndAdviceUrl: getGovUkUrl(
			locale,
			developmentConsentAndAdvice,
			developmentConsentAndAdviceWelsh
		),
		commonTermsUrl: getGovUkUrl(locale, commonTerms, commonTermsWelsh),
		planningGuidanceUrl: planningGuidance,
		advicePagesUrl: getGovUkUrl(locale, advicePages, advicePagesWelsh),
		nationalPolicyStatementsUrl: getGovUkUrl(
			locale,
			nationalPolicyStatements,
			nationalPolicyStatementsWelsh
		)
	};
};

const getGovUkUrl = (locale, enUrl, cyUrl) => (locale === 'cy' ? cyUrl : enUrl);

module.exports = { getGovUkUrls };
