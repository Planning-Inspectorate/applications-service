//LAST
const {
	getRegisterOfAdviceIndexURL
} = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getRegisterOfAdviceBackLinkURL = (refURL, lang) => {
	const indexURL = getRegisterOfAdviceIndexURL(lang).split('?')[0]; // Remove query params
	return refURL && refURL.startsWith(indexURL) ? refURL : getRegisterOfAdviceIndexURL(lang);
};

const getBackToListURL = (refURL, path, caseRef, id, lang) =>
	isRegisterOfAdviceDetailURL(path, id)
		? getRegisterOfAdviceBackLinkURL(refURL, lang)
		: getSection51IndexURL(caseRef, lang);

module.exports = { getBackToListURL };

// const {
//     getRegisterOfAdviceIndexURL
// } = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
// const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
// const {
//     isRegisterOfAdviceDetailURL
// } = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

// /**
//  * Appends search params to a URL if present.
//  * @param {string} url - The base URL.
//  * @param {string} search - The search/query string (e.g. 'searchTerm=adv&itemsPerPage=50').
//  * @returns {string} - The URL with search params appended.
//  */
// const appendSearchParams = (url, search) =>
//     search ? `${url}${url.includes('?') ? '&' : '?'}${search.replace(/^\?/, '')}` : url;

// /**
//  * Returns the Register of Advice back link URL with search params.
//  * @param {string} lang - Language code.
//  * @param {string} search - Search/query string.
//  * @returns {string}
//  */
// const getRegisterOfAdviceBackLinkURL = (lang, search) =>
//     appendSearchParams(getRegisterOfAdviceIndexURL(lang), search);

// /**
//  * Returns the correct "Back to List" URL, preserving search params.
//  * @param {string} refURL - Referrer URL (not used in current logic).
//  * @param {string} path - Current path.
//  * @param {string} caseRef - Case reference.
//  * @param {string} id - Advice detail ID.
//  * @param {string} lang - Language code.
//  * @param {string} search - Search/query string.
//  * @returns {string}
//  */
// const getBackToListURL = (refURL, path, caseRef, id, lang, search) =>
//     isRegisterOfAdviceDetailURL(path, id)
//         ? getRegisterOfAdviceBackLinkURL(lang, search)
//         : appendSearchParams(getSection51IndexURL(caseRef, lang), search);

// module.exports = { getBackToListURL };

// const {
// 	getRegisterOfAdviceIndexURL
// } = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
// const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
// const {
// 	isRegisterOfAdviceDetailURL
// } = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

// const appendSearchParams = (url, search) =>
// 	search ? `${url}${url.includes('?') ? '&' : '?'}${search.replace(/^\?/, '')}` : url;

// const getRegisterOfAdviceBackLinkURL = (lang, search) =>
// 	appendSearchParams(getRegisterOfAdviceIndexURL(lang), search);

// const getBackToListURL = (refURL, path, caseRef, id, lang, search) =>
// 	isRegisterOfAdviceDetailURL(path, id)
// 		? getRegisterOfAdviceBackLinkURL(lang, search)
// 		: appendSearchParams(getSection51IndexURL(caseRef, lang), search);

// module.exports = { getBackToListURL };

// const {
// 	getRegisterOfAdviceIndexURL
// } = require('../../../../register-of-advice/index/_utils/get-register-of-advice-index-url');
// const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
// const {
// 	isRegisterOfAdviceDetailURL
// } = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');
//
// // Add lang parameter to all relevant functions
// const getRegisterOfAdviceBackLinkURL = (refURL, lang) => {
// 	const registerOfAdviceIndexURL = getRegisterOfAdviceIndexURL(lang);
// 	return refURL && refURL.includes(registerOfAdviceIndexURL) ? refURL : registerOfAdviceIndexURL;
// };
//
// const getBackToListURL = (refURL, path, caseRef, id, lang) =>
// 	isRegisterOfAdviceDetailURL(path, id)
// 		? getRegisterOfAdviceBackLinkURL(refURL, lang)
// 		: getSection51IndexURL(caseRef, lang);
//
// module.exports = { getBackToListURL };
