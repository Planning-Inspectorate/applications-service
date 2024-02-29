const {
	getRegisterOfAdviceIndexURL
} = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getBackToListURL = (path, caseRef, id) =>
	isRegisterOfAdviceDetailURL(path, id)
		? getRegisterOfAdviceIndexURL()
		: getSection51IndexURL(caseRef);

module.exports = { getBackToListURL };
