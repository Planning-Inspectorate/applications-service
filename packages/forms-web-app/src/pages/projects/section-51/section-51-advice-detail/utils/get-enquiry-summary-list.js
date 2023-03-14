const { formatDate } = require('../../../../../utils/date-utils');

const getEnquirySummaryListItemViewModel = (keyText, valueText) => ({
	key: {
		text: keyText
	},
	value: {
		text: valueText
	}
});

const getEnquirySummaryList = (pageData) => [
	getEnquirySummaryListItemViewModel('Author', pageData.organisation),
	getEnquirySummaryListItemViewModel('Date published', formatDate(pageData.dateAdviceGiven)),
	getEnquirySummaryListItemViewModel('Enquiry type', pageData.enquiryMethod)
];

module.exports = { getEnquirySummaryList };
