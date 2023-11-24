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

const getAdviceEnquiryText = (enquiryMethod) =>
	isAdviceMeeting(enquiryMethod) ? 'Meeting with' : 'From';

const getAdviceLinkTitle = (advice) =>
	isAdviceMeeting(advice.enquiryMethod)
		? `View meeting with ${getAdviceName(advice)}`
		: `View advice to ${getAdviceName(advice)}`;

const getAdviceLink = (caseRef, { adviceID }) =>
	`${getSection51AdviceDetailURL(caseRef, adviceID)}?caseReference=${caseRef}`;

module.exports = {
	getAdviceLinkTitle,
	getAdviceLink,
	isAdviceMeeting,
	getAdviceTitle,
	getAdviceDateText,
	getAdviceName,
	getAdviceEnquiryText
};
