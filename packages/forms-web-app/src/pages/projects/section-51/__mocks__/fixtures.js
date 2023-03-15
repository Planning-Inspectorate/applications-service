const adviceList = [
	{
		adviceID: 'mock advice id 1',
		adviceGiven: 'mock advice given',
		attachments: [
			{ documentURI: 'mock document URI 1', mime: 'application/pdf' },
			{ documentURI: 'mock document URI 2', mime: 'application/msword' }
		],
		dateAdviceGiven: '2023-01-01',
		enquiryDetail: 'mock enquiry detail',
		enquiryMethod: 'mock enquiry method',
		organisation: 'mock organisation'
	},
	{
		adviceID: 'mock advice id 2',
		enquiryMethod: 'Meeting',
		organisation: 'mock organisation',
		dateAdviceGiven: 'mock date given 2'
	},
	{
		adviceID: 'mock advice id 3',
		enquiryMethod: 'Email',
		firstName: 'mock first name',
		lastName: 'mock last name',
		dateAdviceGiven: 'mock date given 3'
	},
	{
		adviceID: 'mock advice id 4',
		enquiryMethod: 'Email',
		dateAdviceGiven: 'mock date given 4'
	}
];

module.exports = {
	adviceList
};
