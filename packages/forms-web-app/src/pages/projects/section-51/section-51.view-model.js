const { getAdviceLink, getAdviceDateText } = require('./utils/advice-helpers');
const adviceViewModel = (advices) =>
	advices.map((advice) => ({
		adviceID: advice.adviceID,
		link: getAdviceLink(advice),
		date: {
			date: advice.dateAdviceGiven,
			text: `${getAdviceDateText(advice.enquiryMethod)}:`
		},
		method: advice.enquiryMethod
	}));

module.exports = {
	adviceViewModel
};
