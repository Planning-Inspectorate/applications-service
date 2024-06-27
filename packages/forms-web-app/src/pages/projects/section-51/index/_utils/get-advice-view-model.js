const {
	getAdviceLink,
	getAdviceLinkTitle,
	getAdviceDateText,
	getAdviceTypeLabel,
	getAdviceName
} = require('./advice-helpers');
const { isLangWelsh } = require('../../../../_utils/is-lang-welsh');

const getAdviceViewModel = (advices, caseRef, i18n) =>
	advices.map((advice) => ({
		linkTitle: getAdviceLinkTitle(advice, i18n),
		link: getAdviceLink(caseRef, advice),
		enquiryDetail:
			isLangWelsh(i18n.language) && advice.enquiryDetailWelsh
				? advice.enquiryDetailWelsh
				: advice.enquiryDetail,
		adviceGivenBy: getAdviceName(advice, i18n),
		adviceTypeLabel: getAdviceTypeLabel(advice.enquiryMethod, i18n),
		date: {
			date: advice.dateAdviceGiven,
			text: `${getAdviceDateText(advice.enquiryMethod, i18n)}:`
		}
	}));

module.exports = {
	getAdviceViewModel
};
