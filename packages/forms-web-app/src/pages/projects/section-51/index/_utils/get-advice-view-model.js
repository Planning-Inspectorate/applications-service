const {
	getAdviceLink,
	getAdviceLinkTitle,
	getAdviceDateText,
	getAdviceTypeLabel,
	getAdviceName,
	getProjectName
} = require('./advice-helpers');
const { isLangWelsh } = require('../../../../_utils/is-lang-welsh');
const { formatDate } = require('../../../../../utils/date-utils');

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
			date: formatDate(advice.dateAdviceGiven, i18n.language),
			text: `${getAdviceDateText(advice.enquiryMethod, i18n)}:`
		},
		projectName: getProjectName(advice, i18n)
	}));

module.exports = {
	getAdviceViewModel
};
