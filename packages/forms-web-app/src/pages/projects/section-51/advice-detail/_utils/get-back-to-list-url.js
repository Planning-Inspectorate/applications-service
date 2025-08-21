const {
	getRegisterOfAdviceIndexURL
} = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getRegisterOfAdviceBackLinkURL = (refURL) => {
	const registerOfAdviceIndexURL = getRegisterOfAdviceIndexURL();
	return refURL && refURL.includes(registerOfAdviceIndexURL) ? refURL : registerOfAdviceIndexURL;
};

const getBackToListURL = (refURL, path, caseRef, id) =>
	isRegisterOfAdviceDetailURL(path, id)
		? getRegisterOfAdviceBackLinkURL(refURL)
		: getSection51IndexURL(caseRef);

module.exports = { getBackToListURL };
