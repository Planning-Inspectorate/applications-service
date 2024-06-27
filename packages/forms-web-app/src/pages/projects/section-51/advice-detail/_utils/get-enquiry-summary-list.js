const { formatDate } = require('../../../../../utils/date-utils');
const {
	getAdviceDateText,
	getAdviceName,
	getAdviceEnquiryText
} = require('../../index/_utils/advice-helpers');

const getEnquirySummaryListItemViewModel = (keyText, valueText) => ({
	key: {
		text: keyText
	},
	value: {
		text: valueText
	}
});

const getEnquirySummaryList = (pageData, i18n) => [
	getEnquirySummaryListItemViewModel(
		getAdviceEnquiryText(pageData.enquiryMethod, i18n),
		getAdviceName(pageData, i18n)
	),
	getEnquirySummaryListItemViewModel(
		getAdviceDateText(pageData.enquiryMethod, i18n),
		formatDate(pageData.dateAdviceGiven)
	),
	getEnquirySummaryListItemViewModel(i18n.t('section51.enquiryType'), pageData.enquiryMethod)
];

module.exports = { getEnquirySummaryList };
