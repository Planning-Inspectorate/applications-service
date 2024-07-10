const mapAdviceListToApi = (advices) => {
	return advices.map((advice) => mapCommonAdviceFieldsToApi(advice));
};

const mapAdviceToApi = (advice) => {
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
		enquiryDetailWelsh: advice?.enquiryDetailsWelsh,
		adviceGiven: advice?.adviceDetails,
		adviceGivenWelsh: advice?.adviceDetailsWelsh,
		respondedBy: advice?.adviceGivenBy,
		dateEnquiryReceived: advice?.enquiryDate,
		dateAdviceGiven: advice?.adviceDate,
		dateLastModified: advice?.modifiedAt,
		dateCreated: advice?.createdAt,
		title: advice?.title,
		titleWelsh: advice?.titleWelsh
	};
};

module.exports = {
	mapAdviceListToApi,
	mapAdviceToApi
};
