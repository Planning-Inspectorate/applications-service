const {
	getAdviceLink,
	getAdviceLinkTitle,
	getAdviceDateText,
	getAdviceTypeLabel,
	getAdviceName
} = require('./advice-helpers');

const getAdviceViewModel = (advices, caseRef) =>
	advices.map((advice) => ({
		linkTitle: getAdviceLinkTitle(advice),
		link: getAdviceLink(caseRef, advice),
		enquiryDetail: advice.enquiryDetail,
		adviceGivenBy: getAdviceName(advice),
		adviceTypeLabel: getAdviceTypeLabel(advice),
		date: {
			date: advice.dateAdviceGiven,
			text: `${getAdviceDateText(advice.enquiryMethod)}:`
		}
	}));

module.exports = {
	getAdviceViewModel
};
