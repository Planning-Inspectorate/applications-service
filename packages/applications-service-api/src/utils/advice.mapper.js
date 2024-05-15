const { documentsHost } = require('../lib/config');

const mapBackOfficeAdviceListToApi = (backOfficeAdvice) => {
	return backOfficeAdvice.map((advice) => mapCommonAdviceFieldsToApi(advice));
};

const mapBackOfficeAdviceToApi = (advice) => {
	return {
		...mapCommonAdviceFieldsToApi(advice),
		attachments: advice?.attachments?.map((attachment) => ({
			documentDataID: attachment.documentId,
			mime: attachment.mime,
			size: attachment.size,
			documentURI: attachment.publishedDocumentURI
		}))
	};
};

const mapCommonAdviceFieldsToApi = (advice) => {
	const [firstName, ...lastName] = advice && advice.agent ? advice.agent.split(' ') : '';

	return {
		section51Enquiry: true,
		adviceID: advice?.adviceId?.toString(),
		enquiryDate: advice?.enquiryDate,
		enquiryMethod: advice?.method,
		caseReference: advice?.caseReference,
		firstName: firstName || '',
		lastName: lastName?.join(' ') || '',
		organisation: advice?.from,
		enquiryDetail: advice?.enquiryDetails,
		adviceGiven: advice?.adviceDetails,
		respondedBy: advice?.adviceGivenBy,
		dateEnquiryReceived: advice?.enquiryDate,
		dateAdviceGiven: advice?.adviceDate,
		dateLastModified: advice?.modifiedAt,
		dateCreated: advice?.createdAt,
		title: advice?.title
	};
};

const mapNIAdviceToApi = (advice) => {
	return {
		...advice,
		attachments: advice?.attachments?.map((attachment) => ({
			documentDataID: attachment.dataID,
			mime: attachment.mime,
			size: attachment.size,
			documentURI: attachment.path ? `${documentsHost}${attachment.path}` : null
		}))
	};
};

module.exports = {
	mapBackOfficeAdviceListToApi,
	mapBackOfficeAdviceToApi,
	mapNIAdviceToApi
};
