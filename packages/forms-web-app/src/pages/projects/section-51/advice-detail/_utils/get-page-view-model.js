const { getAttachments } = require('./get-attachments');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');
const { getAdviceTitle } = require('../../index/_utils/advice-helpers');
const { getBackToListURL } = require('./get-back-to-list-url');
const { marked } = require('marked');

// parse text to preserve original formatting
const parseText = (text) => (text ? marked.parse(text).trim() : '');

const handleAdviceDetails = (adviceDetails) => ({
	adviceGiven: parseText(adviceDetails.adviceGiven),
	attachments: getAttachments(adviceDetails.attachments),
	enquirySummaryList: getEnquirySummaryList(adviceDetails),
	enquiryText: parseText(adviceDetails.enquiryDetail),
	pageTitle: adviceDetails.enquiryDetail,
	title: getAdviceTitle(adviceDetails)
});

const getPageViewModel = async (refURL, path, caseRef, id, adviceDetails) => ({
	activeId: 'section-51',
	backToListUrl: getBackToListURL(refURL, path, caseRef, id),
	breadcrumbsItems: getBreadcrumbsItems(path, caseRef, id),
	...handleAdviceDetails(adviceDetails)
});

module.exports = { getPageViewModel };
