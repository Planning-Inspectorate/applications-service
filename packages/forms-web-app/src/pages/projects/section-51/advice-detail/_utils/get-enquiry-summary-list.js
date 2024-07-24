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

const getEnquiryTypeText = {
	phone: {
		en: 'phone',
		cy: 'ffôn'
	},
	email: {
		en: 'email',
		cy: 'e-bost'
	},
	post: {
		en: 'post',
		cy: 'post'
	},
	meeting: {
		en: 'meeting',
		cy: 'cyfarfod'
	}
};

const getEnquirySummaryList = (pageData, i18n) => [
	getEnquirySummaryListItemViewModel(
		getAdviceEnquiryText(pageData.enquiryMethod, i18n),
		getAdviceName(pageData, i18n)
	),
	getEnquirySummaryListItemViewModel(
		getAdviceDateText(pageData.enquiryMethod, i18n),
		formatDate(pageData.dateAdviceGiven, i18n.language)
	),
	getEnquirySummaryListItemViewModel(
		i18n.t('section51.enquiryType'),
		getEnquiryTypeText[pageData.enquiryMethod]
			? getEnquiryTypeText[pageData.enquiryMethod?.toLowerCase()][i18n.language]
			: pageData.enquiryMethod
	)
];

module.exports = { getEnquirySummaryList };
