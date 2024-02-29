const { getAttachments } = require('./get-attachments');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');
const { getAdviceTitle } = require('../../index/_utils/advice-helpers');
const { getBackToListURL } = require('./get-back-to-list-url');

const handleAdviceDetails = (adviceDetails) => ({
	adviceGiven: adviceDetails.adviceGiven,
	attachments: getAttachments(adviceDetails.attachments),
	enquirySummaryList: getEnquirySummaryList(adviceDetails),
	enquiryText: adviceDetails.enquiryDetail,
	pageTitle: adviceDetails.enquiryDetail,
	title: getAdviceTitle(adviceDetails)
});

const getPageViewModel = async (path, caseRef, id, adviceDetails) => ({
	activeId: 'section-51',
	backToListUrl: getBackToListURL(path, caseRef, id),
	breadcrumbsItems: getBreadcrumbsItems(path, caseRef, id),
	...handleAdviceDetails(adviceDetails)
});

module.exports = { getPageViewModel };
