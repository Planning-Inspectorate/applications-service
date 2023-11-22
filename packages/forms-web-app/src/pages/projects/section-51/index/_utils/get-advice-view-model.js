const { getAdviceLink, getAdviceLinkTitle, getAdviceDateText } = require('./advice-helpers');

const getAdviceViewModel = (advices, caseRef) =>
	advices.map((advice) => ({
		linkTitle: getAdviceLinkTitle(advice),
		link: getAdviceLink(caseRef, advice),
		date: {
			date: advice.dateAdviceGiven,
			text: `${getAdviceDateText(advice.enquiryMethod)}:`
		},
		method: advice.enquiryMethod
	}));

module.exports = {
	getAdviceViewModel
};
