const mapBackOfficeAdviceToApi = (backOfficeAdvice) => {
	return backOfficeAdvice.map((advice) => {
		const [firstName, ...lastName] = advice && advice.from ? advice.from.split(' ') : undefined;
		return {
			s51Enquiry: true,
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
	});
};

module.exports = {
	mapBackOfficeAdviceToApi
};
