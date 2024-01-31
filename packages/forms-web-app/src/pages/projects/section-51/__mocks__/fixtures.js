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
		adviceGiven: 'mock advice given',
		organisation: 'mock organisation'
	},
	{
		adviceID: 'mock advice id 2',
		enquiryMethod: 'Meeting',
		organisation: 'mock organisation',
		dateAdviceGiven: 'mock date given 2',
		enquiryDetail: 'mock enquiry detail 2'
	},
	{
		adviceID: 'mock advice id 3',
		firstName: 'mock first name',
		lastName: 'mock last name',
		enquiryMethod: 'Email',
		dateAdviceGiven: 'mock date given 3',
		enquiryDetail: 'mock enquiry detail 3'
	},
	{
		adviceID: 'mock advice id 4',
		enquiryMethod: 'Email',
		dateAdviceGiven: 'mock date given 4',
		adviceGiven: 'mock advice given 4',
		enquiryDetail: 'mock enquiry detail 4'
	}
];

module.exports = {
	adviceList
};
