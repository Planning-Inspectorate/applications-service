const { getAttachments } = require('./get-attachments');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');
const { getAdviceTitle } = require('../../index/_utils/advice-helpers');
const { getBackToListURL } = require('./get-back-to-list-url');
const { marked } = require('marked');
const { isLangWelsh } = require('../../../../_utils/is-lang-welsh');

// parse text to preserve original formatting
const parseText = (text) => (text ? marked.parse(text).trim() : '');

const handleAdviceDetails = (adviceDetails, i18n) => {
	const langIsWelsh = isLangWelsh(i18n.language);
	const adviceGiven = langIsWelsh ? adviceDetails.adviceGivenWelsh : adviceDetails.adviceGiven;
	const enquiryDetail = langIsWelsh
		? adviceDetails.enquiryDetailWelsh
		: adviceDetails.enquiryDetail;
	return {
		adviceGiven: parseText(adviceGiven),
		attachments: getAttachments(adviceDetails.attachments),
		enquirySummaryList: getEnquirySummaryList(adviceDetails, i18n),
		enquiryText: parseText(enquiryDetail),
		pageTitle: enquiryDetail,
		title: getAdviceTitle(adviceDetails, i18n)
	};
};

const getPageViewModel = async (refURL, path, caseRef, id, adviceDetails, i18n) => ({
	activeId: 'section-51',
	backToListUrl: getBackToListURL(refURL, path, caseRef, id),
	breadcrumbsItems: getBreadcrumbsItems(path, caseRef, id),
	...handleAdviceDetails(adviceDetails, i18n)
});

module.exports = { getPageViewModel };
