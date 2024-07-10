const RESPONSE_DOCUMENTS = [
	{
		id: 1052,
		dataId: 'EN010085-002134',
		caseReference: 'EN010085',
		stage: 7,
		type: 'Correction Order',
		filter1: 'Plans',
		filter2: 'Correction Order',
		category: null,
		description:
			'Correction Order for The Cleve Hill Solar Park Order 2020. This came into force on 11 August 2021',
		size: 81778,
		mime: 'application/pdf',
		path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010085/EN010085-002134-Cleve_Hill_Solar_Park_Correction_Order_2021.pdf',
		status: 'Published',
		datePublished: '2021-12-08',
		deadlineDate: null,
		personalName: 'Removed',
		representative: null,
		whoFrom: 'NULL',
		docReference: 'NULL',
		author: 'NULL',
		details: 'NULL',
		lastModified: '2021-12-08 13:07',
		dateCreated: '2021-12-08 11:10'
	},
	{
		id: 1053,
		dataId: 'EN010085-002133',
		caseReference: 'EN010085',
		stage: 7,
		type: 'Correction Notice',
		filter1: 'Decided',
		filter2: 'Correction Notice',
		category: null,
		description:
			'Details of the corrections made by the Secretary of State to The Cleve Hill Solar Park Order 2020',
		size: 131662,
		mime: 'application/pdf',
		path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010085/EN010085-002133-Cleve Hill Corrections Notice of 10 August 2021 FINAL FOR ISSUE.pdf',
		status: 'Published',
		datePublished: '2021-12-08',
		deadlineDate: null,
		personalName: 'Removed',
		representative: null,
		whoFrom: 'NULL',
		docReference: 'NULL',
		author: 'NULL',
		details: 'NULL',
		lastModified: '2021-12-08 11:51',
		dateCreated: '2021-12-08 11:10'
	},
	{
		id: 365,
		dataId: 'EN010085-000925',
		caseReference: 'EN010085',
		stage: 4,
		type: 'Recording of hearing',
		filter1: 'Recording of hearing',
		filter2: null,
		category: null,
		description: null,
		size: 32139,
		mime: 'application/pdf',
		path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010085/EN010085-000925-Recording of Issue Specific Hearing 1 (Need) Action Points - 17 July 2019 mp3.pdf',
		status: 'Published',
		datePublished: '2021-04-23',
		deadlineDate: '2019-07-17',
		personalName: 'Recording of Issue Specific Hearing 1 - Action Points - 17 July 2019',
		representative: null,
		whoFrom: 'NULL',
		docReference: 'NULL',
		author: 'NULL',
		details: 'NULL',
		lastModified: '2021-4-23 11:35',
		dateCreated: '2021-4-23 11:35'
	},
	{
		id: 329,
		dataId: 'EN010085-001882',
		caseReference: 'EN010085',
		stage: 1,
		type: 'Application Form',
		filter1: null,
		filter2: null,
		category: "Developer's application",
		description: null,
		size: 105711,
		mime: 'application/pdf',
		path: 'https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010085/EN010085-001882-London_Array_Limited_-_AS.pdf',
		status: 'Published',
		datePublished: '2020-10-01',
		deadlineDate: null,
		personalName: null,
		representative: null,
		whoFrom: 'NULL',
		docReference: 'NULL',
		author: 'NULL',
		details: 'NULL',
		lastModified: '2020-10-01 13:30',
		dateCreated: '2020-10-01 13:30'
	}
];

const BACK_OFFICE_DB_DOCUMENTS = [
	{
		id: 1,
		documentId: '1',
		caseRef: 'EN010009',
		documentReference: null,
		version: '1',
		examinationRefNo: '',
		filename: 'TR0100012-Advice-note-6-Annex-PINS.pdf',
		originalFilename: 'TR0100012-Advice-note-6-Annex-PINS.pdf',
		size: 412846,
		mime: 'application/pdf',
		publishedDocumentURI: 'https://example.org/file.pdf',
		path: 'EN010009/TR0100012-Advice-note-6-Annex-PINS.pdf',
		virusCheckStatus: 'scanned',
		fileMD5: '49f68a5c8493ec2c0bf489821c21fc3b',
		dateCreated: '2023-03-26T00:00:00.000',
		lastModified: '2023-03-26T00:00:00.000',
		caseType: 'nsip',
		documentStatus: 'submitted',
		redactedStatus: 'redacted',
		publishedStatus: 'published',
		datePublished: '2023-03-26T00:00:00.000',
		documentType: 'Dave',
		securityClassification: 'public',
		sourceSystem: 'back_office',
		origin: 'pins',
		owner: '',
		author: null,
		representative: '',
		description: '',
		stage: 'pre-application',
		filter1: 'CR-1234-A',
		filter2: '',
		createdAt: '2023-06-19 10:50:31.8860000',
		modifiedAt: '2023-06-19 10:50:31.8860000'
	}
];

const RESPONSE_FILTERS = [
	{
		name: 'stage',
		value: 1,
		count: 1,
		label: 'Pre-application',
		type: [{ value: 'Application Form', count: 1 }]
	},
	{
		name: 'stage',
		value: 4,
		count: 1,
		label: 'Examination',
		type: [{ value: 'Recording of hearing', count: 1 }]
	},
	{
		name: 'stage',
		value: 7,
		count: 2,
		label: 'Post-decision',
		type: [
			{ value: 'Plans', count: 1 },
			{ value: 'Decided', count: 1 }
		]
	},
	{
		name: 'category',
		value: "Developer's application",
		label: "Developer's application",
		count: 1,
		type: [{ value: 'Application Form', count: 1 }]
	}
];

module.exports = {
	RESPONSE_DOCUMENTS,
	RESPONSE_FILTERS,
	BACK_OFFICE_DB_DOCUMENTS
};
