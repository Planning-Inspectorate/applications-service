const config = require('../../config');

const getGovUkUrls = (locale = 'en') => {
	const {
		developmentConsent,
		developmentConsentWelsh,
		developmentConsentAndAdvice,
		developmentConsentAndAdviceWelsh,
		nationalPolicyStatements,
		nationalPolicyStatementsWelsh,
		planningGuidance,
		advicePages
	} = config.govUK;

	return {
		developmentConsentUrl: getGovUkUrl(locale, developmentConsent, developmentConsentWelsh),
		developmentConsentAndAdviceUrl: getGovUkUrl(
			locale,
			developmentConsentAndAdvice,
			developmentConsentAndAdviceWelsh
		),
		planningGuidanceUrl: planningGuidance,
		advicePagesUrl: advicePages,
		nationalPolicyStatementsUrl: getGovUkUrl(
			locale,
			nationalPolicyStatements,
			nationalPolicyStatementsWelsh
		)
	};
};

const getGovUkUrl = (locale, enUrl, cyUrl) => (locale === 'cy' ? cyUrl : enUrl);

module.exports = { getGovUkUrls };
