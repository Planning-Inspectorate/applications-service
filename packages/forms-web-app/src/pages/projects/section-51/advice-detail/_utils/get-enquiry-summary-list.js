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

const getEnquirySummaryList = (pageData) => [
	getEnquirySummaryListItemViewModel(
		getAdviceEnquiryText(pageData.enquiryMethod),
		getAdviceName(pageData)
	),
	getEnquirySummaryListItemViewModel(
		getAdviceDateText(pageData.enquiryMethod),
		formatDate(pageData.dateAdviceGiven)
	),
	getEnquirySummaryListItemViewModel('Enquiry type', pageData.enquiryMethod)
];

module.exports = { getEnquirySummaryList };
