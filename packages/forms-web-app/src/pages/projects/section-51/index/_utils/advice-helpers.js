const {
	getRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/get-register-of-advice-detail-url');
const { registerOfAdviceCaseRef } = require('../../../../register-of-advice/index/config');
const {
	getSection51AdviceDetailURL
} = require('../../advice-detail/_utils/get-section-51-advice-detail-url');

const getAdviceName = ({ organisation, firstName, lastName }) => {
	let name = 'Anonymous';
	if (organisation) name = organisation;
	else if (firstName && lastName) name = `${firstName} ${lastName}`;
	return name;
};

const isAdviceMeeting = (enquiryMethod) => enquiryMethod === 'Meeting';
const getAdviceDateText = (enquiryMethod) =>
	isAdviceMeeting(enquiryMethod) ? 'Date of meeting' : 'Date advice given';

const getAdviceTitle = (advice) =>
	isAdviceMeeting(advice.enquiryMethod)
		? `Meeting with ${getAdviceName(advice)}`
		: `Advice to ${getAdviceName(advice)}`;

const getAdviceTypeLabel = (advice) =>
	isAdviceMeeting(advice.enquiryMethod) ? `Meeting with` : `Enquiry from`;

const getAdviceEnquiryText = (enquiryMethod) =>
	isAdviceMeeting(enquiryMethod) ? 'Meeting with' : 'From';

const getAdviceLinkTitle = (advice) => {
	if (advice.title) return advice.title;

	return isAdviceMeeting(advice.enquiryMethod)
		? `View meeting with ${getAdviceName(advice)}`
		: `View advice to ${getAdviceName(advice)}`;
};

const getAdviceLink = (caseRef, { adviceID }) =>
	caseRef === registerOfAdviceCaseRef
		? getRegisterOfAdviceDetailURL(adviceID)
		: getSection51AdviceDetailURL(caseRef, adviceID);

module.exports = {
	getAdviceLinkTitle,
	getAdviceLink,
	isAdviceMeeting,
	getAdviceTitle,
	getAdviceTypeLabel,
	getAdviceDateText,
	getAdviceName,
	getAdviceEnquiryText
};
