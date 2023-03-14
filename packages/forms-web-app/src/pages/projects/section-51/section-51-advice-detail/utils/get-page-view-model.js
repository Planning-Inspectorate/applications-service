const { getAttachments } = require('./get-attachments');
const { getBackLinkUrl } = require('./get-back-link-url');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');

const getPageViewModel = async (locals, pageData) => ({
	activeId: 'section-51',
	adviceGiven: pageData.adviceGiven,
	attachments: getAttachments(pageData.attachments),
	backToListUrl: getBackLinkUrl(locals.caseRef),
	breadcrumbsItems: getBreadcrumbsItems(locals.caseRef),
	enquirySummaryList: getEnquirySummaryList(pageData),
	enquiryText: pageData.enquiryDetail,
	pageTitle: pageData.enquiryDetail,
	title: pageData.enquiryDetail
});

module.exports = { getPageViewModel };
