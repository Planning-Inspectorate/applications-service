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
			documentURI: attachment.documentURI
		}))
	};
};

const mapCommonAdviceFieldsToApi = (advice) => {
	const [firstName, ...lastName] = advice && advice.from ? advice.from.split(' ') : undefined;
	return {
		section51Enquiry: true,
		adviceID: advice?.adviceId?.toString(),
		enquiryDate: advice?.enquiryDate,
		enquiryMethod: advice?.method,
		caseReference: advice?.caseReference,
		firstName: firstName,
		lastName: lastName?.join(' '),
		organisation: advice?.agent,
		enquiryDetail: advice?.enquiryDetails,
		adviceGiven: advice?.adviceDetails,
		respondedBy: advice?.adviceGivenBy,
		dateEnquiryReceived: advice?.enquiryDate,
		dateAdviceGiven: advice?.adviceDate,
		dateLastModified: advice?.modifiedAt,
		dateCreated: advice?.createdAt
	};
};

const mapNIAdviceToApi = (advice) => {
	return {
		...advice,
		attachments: advice?.attachments?.map((attachment) => ({
			documentDataID: attachment.documentDataID,
			mime: attachment.mime,
			size: attachment.size,
			documentURI: attachment.documentURI ? `${documentsHost}${attachment.documentURI}` : null
		}))
	};
};

module.exports = {
	mapBackOfficeAdviceListToApi,
	mapBackOfficeAdviceToApi,
	mapNIAdviceToApi
};
