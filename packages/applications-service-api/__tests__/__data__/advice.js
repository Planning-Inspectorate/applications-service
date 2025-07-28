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
	firstName: advice?.from?.split(' ')[0],
	lastName: advice?.from?.split(' ').slice(1).join(' '),
	organisation: advice?.agent,
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
	titleWelsh: advice?.titleWelsh,
	projectName: '',
	projectNameWelsh: ''
}));

const GENERAL_ADVICE_BACKOFFICE_DATA = [
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
		ModifiedAt: '2021-06-01',
		project: {
			projectName: 'Project name',
			projectNameWelsh: 'Project name in Welsh'
		}
	}
];

const GENERAL_ADVICE_BACKOFFICE_RESPONSE = GENERAL_ADVICE_BACKOFFICE_DATA.map((advice) => ({
	section51Enquiry: true,
	adviceID: advice?.adviceId?.toString(),
	enquiryDate: advice?.enquiryDate,
	enquiryMethod: advice?.method,
	caseReference: advice?.caseReference,
	firstName: advice?.from?.split(' ')[0],
	lastName: advice?.from?.split(' ').slice(1).join(' '),
	organisation: advice?.agent,
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
	titleWelsh: advice?.titleWelsh,
	projectName: advice?.project?.projectName,
	projectNameWelsh: advice?.project?.projectNameWelsh
}));

const ADVICE_NI_DATA = [
	{
		adviceID: 'NI-CASEID',
		enquiryDate: '2020-02-19',
		enquiryMethod: 'Email',
		industrySector: 'Energy',
		caseReference: 'EN010009',
		firstName: 'Joe',
		lastName: 'Bloggs',
		organisation: 'The organisation',
		enquiryDetail: 'Do we need more energy',
		adviceGiven: 'Yes we do',
		respondedBy: 'Joe Bloggs',
		section51Enquiry: true,
		initiatedDate: '2016-04-28',
		dateEnquiryReceived: '2016-04-28 08:42:58',
		dateAdviceGiven: '2016-04-28',
		dateLastModified: '2016-04-28 08:42:58',
		dateCreated: '2016-04-28 08:42:58',
		attachments: 'attachment1,attachment2,attachment3'
	}
];

const ADVICE_NI_RESPONSE = [...ADVICE_NI_DATA];

module.exports = {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA,
	GENERAL_ADVICE_BACKOFFICE_RESPONSE,
	GENERAL_ADVICE_BACKOFFICE_DATA,
	ADVICE_NI_RESPONSE,
	ADVICE_NI_DATA
};
