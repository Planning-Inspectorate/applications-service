const { getAttachments } = require('./get-attachments');
const { getBackLinkUrl } = require('./get-navigation-urls');
const { getEnquirySummaryList } = require('./get-enquiry-summary-list');
const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');
const { getAdviceTitle } = require('../../utils/advice-helpers');

const handleAdviceDetails = (adviceDetails) => ({
	adviceGiven: adviceDetails.adviceGiven,
	attachments: getAttachments(adviceDetails.attachments),
	enquirySummaryList: getEnquirySummaryList(adviceDetails),
	enquiryText: adviceDetails.enquiryDetail,
	pageTitle: adviceDetails.enquiryDetail,
	title: getAdviceTitle(adviceDetails)
});

const getPageViewModel = async ({ caseRef }, adviceDetails, referer) => ({
	activeId: 'section-51',
	backToListUrl: getBackLinkUrl(referer, caseRef),
	breadcrumbsItems: getBreadcrumbsItems(caseRef),
	...handleAdviceDetails(adviceDetails)
});

module.exports = { getPageViewModel };
