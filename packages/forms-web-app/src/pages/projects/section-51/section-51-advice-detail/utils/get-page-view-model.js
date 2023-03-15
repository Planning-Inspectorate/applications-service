const { getAttachments } = require('./get-attachments');
const { getBackLinkUrl } = require('./get-navigation-urls');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');

const getPageViewModel = async (locals, pageData, referer) => ({
	activeId: 'section-51',
	adviceGiven: pageData.adviceGiven,
	attachments: getAttachments(pageData.attachments),
	backToListUrl: getBackLinkUrl(referer, locals.caseRef),
	breadcrumbsItems: getBreadcrumbsItems(locals.caseRef),
	enquirySummaryList: getEnquirySummaryList(pageData),
	enquiryText: pageData.enquiryDetail,
	pageTitle: pageData.enquiryDetail,
	title: pageData.enquiryDetail
});

module.exports = { getPageViewModel };
