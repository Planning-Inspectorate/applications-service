const ADVICE_BACKOFFICE_DATA = [
	{
		adviceId: 1,
		adviceReference: 'TR0200007-0005',
		caseReference: 'BACKOFFICE-CASEID',
		caseId: 130,
		title: 'Advice title',
		titleWelsh: 'Advice title in Welsh',
		from: 'Advice Org',
		agent: 'Advice agent name',
		method: 'Advice method',
		enquiryDate: '2021-06-01',
		enquiryDetails: 'Advice enquiry details',
		enquiryDetailsWelsh: 'Advice enquiry details in Welsh',
		adviceGivenBy: 'Advice given by',
		adviceDate: '2021-08-01',
		adviceDetails: 'Advice details',
		adviceDetailsWelsh: 'Advice details in Welsh',
		status: 'Advice status',
		redactionStatus: 'Advice redaction status',
		attachmentIds: '1,2,3',
		createdAt: '2021-06-01',
		ModifiedAt: '2021-06-01'
	}
];

const ADVICE_BACKOFFICE_RESPONSE = ADVICE_BACKOFFICE_DATA.map((advice) => ({
	section51Enquiry: true,
	adviceID: advice?.adviceId?.toString(),
	enquiryDate: advice?.enquiryDate,
	enquiryMethod: advice?.method,
	caseReference: advice?.caseReference,
	firstName: advice?.agent?.split(' ')[0],
	lastName: advice?.agent?.split(' ').slice(1).join(' '),
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
}));

module.exports = {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA
};
