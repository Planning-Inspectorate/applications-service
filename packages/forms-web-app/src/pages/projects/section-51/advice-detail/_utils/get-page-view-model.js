const { getAttachments } = require('./get-attachments');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');
const { getAdviceTitle } = require('../../index/_utils/advice-helpers');
const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');

const handleAdviceDetails = (adviceDetails) => ({
	adviceGiven: adviceDetails.adviceGiven,
	attachments: getAttachments(adviceDetails.attachments),
	enquirySummaryList: getEnquirySummaryList(adviceDetails),
	enquiryText: adviceDetails.enquiryDetail,
	pageTitle: adviceDetails.enquiryDetail,
	title: getAdviceTitle(adviceDetails)
});

const getPageViewModel = async ({ caseRef }, adviceDetails) => ({
	activeId: 'section-51',
	backToListUrl: getSection51IndexURL(caseRef),
	breadcrumbsItems: getBreadcrumbsItems(caseRef),
	...handleAdviceDetails(adviceDetails)
});

module.exports = { getPageViewModel };
