const adviceList = [
	{
		adviceID: 'mock advice id 1',
		enquiryMethod: 'Email',
		attachments: [
			{ documentURI: 'mock document URI 1', mime: 'application/pdf' },
			{ documentURI: 'mock document URI 2', mime: 'application/msword' }
		],
		dateAdviceGiven: '2023-01-01',
		enquiryDetail: 'mock enquiry detail',
		enquiryDetailWelsh: 'mock enquiry detail in Welsh',
		adviceGiven: 'mock advice given',
		adviceGivenWelsh: 'mock advice given in Welsh',
		organisation: 'mock organisation',
		projectName: '',
		projectNameWelsh: ''
	},
	{
		adviceID: 'mock advice id 2',
		enquiryMethod: 'Meeting',
		organisation: 'mock organisation',
		dateAdviceGiven: '2024-06-06',
		enquiryDetail: 'mock enquiry detail 2',
		enquiryDetailWelsh: 'mock enquiry detail 2 in Welsh',
		projectName: '',
		projectNameWelsh: ''
	},
	{
		adviceID: 'mock advice id 3',
		firstName: 'mock first name',
		lastName: 'mock last name',
		enquiryMethod: 'Email',
		dateAdviceGiven: '2024-12-12',
		enquiryDetail: 'mock enquiry detail 3',
		enquiryDetailWelsh: 'mock enquiry detail 3 in Welsh',
		projectName: '',
		projectNameWelsh: ''
	},
	{
		adviceID: 'mock advice id 4',
		enquiryMethod: 'Email',
		dateAdviceGiven: '2023-10-10',
		adviceGiven: 'mock advice given 4',
		adviceGivenWelsh: 'mock advice given 4 in Welsh',
		enquiryDetail: 'mock enquiry detail 4',
		enquiryDetailWelsh: 'mock enquiry detail 4 in Welsh',
		projectName: '',
		projectNameWelsh: ''
	}
];

module.exports = {
	adviceList
};
