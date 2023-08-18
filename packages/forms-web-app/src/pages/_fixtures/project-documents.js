const getApplicationApprovalDocumentFixture = {
	resp_code: 200,
	data: {
		id: 390,
		dataId: 'EN010085-001956',
		caseReference: 'EN010085',
		stage: 6,
		type: 'DCO decision letter (SoS)(approve)',
		filter1: "Secretary of State's Decision letter and Statement of Reasons",
		filter2: null,
		category: null,
		description: null,
		size: 450275,
		mime: 'application/pdf',
		path: "https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010085/EN010085-001956-200528 EN010085 CHSP Secretary of State's Decision Letter.pdf",
		status: 'Published',
		datePublished: '2020-05-28',
		deadlineDate: null,
		personalName: "Secretary of State's Decision letter and Statement of Reasons",
		representative: null,
		whoFrom: 'NULL',
		docReference: 'NULL',
		author: 'NULL',
		details: 'NULL',
		lastModified: '2020-5-28 16:09',
		dateCreated: '2020-5-28 16:09'
	}
};

const getApplicationRefusalDocumentFixture = {
	resp_code: 200,
	data: {
		id: 390,
		dataId: 'EN010085-001956',
		caseReference: 'EN010085',
		stage: 6,
		type: 'DCO decision letter (SoS)(refuse)',
		filter1: "Secretary of State's Decision letter and Statement of Reasons",
		filter2: null,
		category: null,
		description: null,
		size: 450275,
		mime: 'application/pdf',
		path: "https://nitestaz.planninginspectorate.gov.uk/wp-content/ipc/uploads/projects/EN010085/EN010085-001956-200528 EN010085 CHSP Secretary of State's Decision Letter.pdf",
		status: 'Published',
		datePublished: '2020-05-28',
		deadlineDate: null,
		personalName: "Secretary of State's Decision letter and Statement of Reasons",
		representative: null,
		whoFrom: 'NULL',
		docReference: 'NULL',
		author: 'NULL',
		details: 'NULL',
		lastModified: '2020-5-28 16:09',
		dateCreated: '2020-5-28 16:09'
	}
};

module.exports = {
	getApplicationApprovalDocumentFixture,
	getApplicationRefusalDocumentFixture
};
