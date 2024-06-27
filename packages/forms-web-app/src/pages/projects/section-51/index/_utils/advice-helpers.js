const {
	getRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/get-register-of-advice-detail-url');
const { registerOfAdviceCaseRef } = require('../../../../register-of-advice/index/config');
const {
	getSection51AdviceDetailURL
} = require('../../advice-detail/_utils/get-section-51-advice-detail-url');
const { isLangWelsh } = require('../../../../_utils/is-lang-welsh');

const getAdviceName = ({ organisation, firstName, lastName }, i18n) => {
	let name = i18n.t('section51.anonymous');
	if (organisation?.trim()) name = organisation.trim();
	else if (firstName && lastName) name = `${firstName} ${lastName}`;
	return name;
};

const isAdviceMeeting = (enquiryMethod) => enquiryMethod === 'Meeting';
const getAdviceDateText = (enquiryMethod, i18n) => {
	return isAdviceMeeting(enquiryMethod)
		? i18n.t('section51.dateOfMeeting')
		: i18n.t('section51.dateAdviceGiven');
};

const getAdviceTitle = (advice, i18n) => {
	if (isLangWelsh(i18n.language) && advice.titleWelsh) return advice.titleWelsh;
	if (advice.title) return advice.title;

	return isAdviceMeeting(advice.enquiryMethod)
		? `${i18n.t('section51.meetingWith')} ${getAdviceName(advice, i18n)}`
		: `${i18n.t('section51.adviceTo')} ${getAdviceName(advice, i18n)}`;
};

const getAdviceTypeLabel = (enquiryMethod, i18n) => {
	return isAdviceMeeting(enquiryMethod)
		? i18n.t('section51.meetingWith')
		: i18n.t('section51.enquiryFrom');
};

const getAdviceEnquiryText = (enquiryMethod, i18n) => {
	return isAdviceMeeting(enquiryMethod)
		? i18n.t('section51.meetingWith')
		: i18n.t('section51.from');
};

const getAdviceLinkTitle = (advice, i18n) => {
	if (isLangWelsh(i18n.language) && advice.titleWelsh) return advice.titleWelsh;
	if (advice.title) return advice.title;

	return isAdviceMeeting(advice.enquiryMethod)
		? `${i18n.t('section51.viewMeetingWith')} ${getAdviceName(advice, i18n)}`
		: `${i18n.t('section51.viewAdviceTo')} ${getAdviceName(advice, i18n)}`;
};

const getAdviceLink = (caseRef, { adviceID }) =>
	caseRef === registerOfAdviceCaseRef
		? getRegisterOfAdviceDetailURL(adviceID)
		: getSection51AdviceDetailURL(caseRef, adviceID);

const doesAdviceExist = (advice) => {
	return advice.length > 0;
};

// We need to know if no advice items returned from an api is a result of a search with 0 results, or because there is no advice present.

const wasSearchAttempted = (queryUrl) => {
	return queryUrl.includes('search');
};

module.exports = {
	getAdviceLinkTitle,
	getAdviceLink,
	isAdviceMeeting,
	getAdviceTitle,
	getAdviceTypeLabel,
	getAdviceDateText,
	getAdviceName,
	getAdviceEnquiryText,
	doesAdviceExist,
	wasSearchAttempted
};
