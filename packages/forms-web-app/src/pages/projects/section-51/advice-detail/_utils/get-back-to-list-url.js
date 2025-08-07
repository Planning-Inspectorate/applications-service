const {
	getRegisterOfAdviceIndexURL
} = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getRegisterOfAdviceBackLinkURL = (refURL, lang) => {
	const registerOfAdviceIndexURL = getRegisterOfAdviceIndexURL();
	const url =
		refURL && refURL.includes(registerOfAdviceIndexURL) ? refURL : registerOfAdviceIndexURL;
	return lang ? `${url}?lang=${lang}` : url;
};

const getBackToListURL = (refURL, path, caseRef, id, lang) =>
	isRegisterOfAdviceDetailURL(path, id)
		? getRegisterOfAdviceBackLinkURL(refURL, lang)
		: getSection51IndexURL(caseRef);

module.exports = { getBackToListURL };
