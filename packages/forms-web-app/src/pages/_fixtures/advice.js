const adviceNIFixture = {
	data: {
		advice: [
			{
				adviceID: 'General-Advice-00001',
				enquiryDate: null,
				enquiryMethod: 'Email',
				industrySector: null,
				caseReference: 'General',
				firstName: 'John',
				lastName: 'Smith',
				organisation: 'Test organisation',
				enquiryDetail:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat magna arcu, eget interdum risus pretium suscipit. Nam vel urna ut tellus laoreet egestas. Integer venenatis justo a sem scelerisque fermentum.',
				adviceGiven:
					'Donec pretium, tellus sit amet ultricies vehicula, leo nibh commodo urna, in finibus libero felis non felis.',
				respondedBy: null,
				section51Enquiry: 'Yes',
				initiatedDate: null,
				dateEnquiryReceived: null,
				dateAdviceGiven: '2021-03-18',
				dateLastModified: '2021-03-25T11:45:05.000Z',
				dateCreated: '2021-03-25T11:45:05.000Z'
			},
			{
				adviceID: 'General-Advice-00002',
				enquiryDate: null,
				enquiryMethod: 'Email',
				industrySector: null,
				caseReference: 'General',
				firstName: 'Jo',
				lastName: 'Bloggs',
				organisation: 'Test Inc',
				enquiryDetail:
					'Vestibulum sit amet sapien consequat, varius neque vel, bibendum erat. Cras mollis neque id sem feugiat consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed efficitur pharetra tortor, at tincidunt elit vulputate a.',
				adviceGiven:
					'Vestibulum id posuere risus, vitae sollicitudin massa. Etiam aliquet efficitur diam, quis condimentum ligula finibus vitae.',
				respondedBy: null,
				section51Enquiry: 'Yes',
				initiatedDate: null,
				dateEnquiryReceived: null,
				dateAdviceGiven: '2020-08-16',
				dateLastModified: '2020-10-09T09:15:01.000Z',
				dateCreated: '2020-08-17T03:00:35.000Z'
			}
		],
		totalItems: 2,
		itemsPerPage: 25,
		totalPages: 1,
		currentPage: 1
	}
};

const adviceBOFixture = {
	data: {
		advice: [
			{
				section51Enquiry: true,
				adviceID: '76',
				enquiryDate: '2024-02-01T00:00:00.000Z',
				enquiryMethod: 'email',
				caseReference: 'BC0110003',
				firstName: 'Test first name',
				lastName: 'Test last name',
				organisation: 'Test organisation',
				enquiryDetail:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed rutrum enim. Cras est neque, mollis ut bibendum sit amet, feugiat non risus. Vestibulum tristique orci sit amet lacus mattis, at fringilla tortor ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean gravida iaculis venenatis. Quisque non lorem nisl. Praesent efficitur magna lorem, vel laoreet nunc rutrum nec.',
				adviceGiven:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed rutrum enim. Cras est neque, mollis ut bibendum sit amet, feugiat non risus. Vestibulum tristique orci sit amet lacus mattis, at fringilla tortor ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean gravida iaculis venenatis. Quisque non lorem nisl. Praesent efficitur magna lorem, vel laoreet nunc rutrum nec.',
				respondedBy: 'Test name',
				dateEnquiryReceived: '2024-02-01T00:00:00.000Z',
				dateAdviceGiven: '2024-02-01T00:00:00.000Z',
				dateLastModified: '2024-02-27T14:25:07.337Z',
				dateCreated: '2024-02-27T14:25:07.255Z',
				title: 'Test advice title'
			},
			{
				section51Enquiry: true,
				adviceID: '18',
				enquiryDate: '2023-09-21T00:00:00.000Z',
				enquiryMethod: 'email',
				caseReference: 'BC0110003',
				firstName: 'Test first name 2',
				lastName: 'Test last name 2',
				organisation: 'Test organisation 2',
				enquiryDetail: 'Test advice with attachment',
				adviceGiven: 'Hopefully we can see the document',
				respondedBy: 'Joe Bloggs',
				dateEnquiryReceived: '2023-09-21T00:00:00.000Z',
				dateAdviceGiven: '2023-09-21T00:00:00.000Z',
				dateLastModified: '2024-02-26T18:34:16.700Z',
				dateCreated: '2024-02-26T18:34:16.672Z',
				title: 'Advice With Document'
			}
		],
		totalItems: 2,
		itemsPerPage: 50,
		totalPages: 1,
		currentPage: 1
	}
};

const adviceFixture = {
	adviceNIFixture,
	adviceBOFixture
};

module.exports = { adviceFixture };
