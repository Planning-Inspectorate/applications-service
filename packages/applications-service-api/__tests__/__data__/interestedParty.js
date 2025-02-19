// Interested Party in format for Applications API request body
const INTERESTED_PARTY_SELF_API = {
	case_ref: 'BC0110002',
	behalf: 'me',
	'full-name': 'Joe Bloggs',
	'over-18': 'yes',
	address: {
		line1: '123 Some Street',
		line2: 'Kings Cross',
		line3: 'London',
		postcode: 'N1 9BE',
		country: 'England'
	},
	email: 'joe@example.org',
	telephone: '07700900000',
	comment: 'this is the representation'
};

const INTERESTED_PARTY_ORGANISATION_API = {
	...INTERESTED_PARTY_SELF_API,
	behalf: 'them',
	'organisation-name': 'Example Company',
	role: 'CEO'
};

const INTERESTED_PARTY_AGENT_PERSON_API = {
	case_ref: 'BC0110002',
	behalf: 'you',
	representing: 'person',
	representee: {
		'full-name': 'Joe Bloggs',
		'over-18': 'yes',
		address: {
			line1: '123 Some Street',
			line2: 'Kings Cross',
			line3: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		},
		email: 'joe@example.org',
		telephone: '07700900000'
	},
	representor: {
		'full-name': 'A.N. Other',
		'over-18': null,
		address: {
			line1: 'Flat 1',
			line2: '72 South Street',
			line3: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		},
		email: 'another@example.org',
		telephone: '07700900001',
		'organisation-name': 'Example Company'
	},
	comment: 'this is the representation'
};

const INTERESTED_PARTY_AGENT_ORGANISATION_API = {
	...INTERESTED_PARTY_AGENT_PERSON_API,
	behalf: 'you',
	representing: 'organisation',
	representee: {
		'full-name': 'Another Org',
		'over-18': null,
		address: {
			line1: 'Unit 1',
			line2: '921 North Street',
			line3: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		},
		email: 'another@example.org',
		telephone: '07700900000'
	}
};

const INTERESTED_PARTY_AGENT_FAMILY_API = {
	...INTERESTED_PARTY_AGENT_PERSON_API,
	behalf: 'you',
	representing: 'family',
	representee: {
		'full-name': 'Robinson Family',
		'over-18': 'yes',
		address: {
			line1: '123 Some Street',
			line2: 'Kings Cross',
			line3: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		},
		email: 'robinsons@example.org',
		telephone: '07700900002'
	}
};

// format for NI database
const INTERESTED_PARTY_SELF_NI = {
	caseref: 'EN010116',
	behalf: 'me',
	therep: 'this is the representation',
	mename: 'Joe Bloggs',
	memail: 'joe@example.org',
	mephone: '07700900000',
	mebuild: '123 Some Street',
	mestreet: 'Kings Cross',
	metown: 'London',
	mecode: 'N1 9BE',
	mecountry: 'England',
	mecounty: 'over18'
};

const INTERESTED_PARTY_ORGANISATION_NI = {
	caseref: 'BC0110002',
	behalf: 'them',
	therep: 'this is the representation',
	orgname: 'Example Company',
	contactname: 'Joe Bloggs',
	contactjob: 'CEO',
	orgbuild: '123 Some Street',
	orgstreet: 'Kings Cross',
	orgtown: 'London',
	orgcode: 'N1 9BE',
	orgcountry: 'England',
	orgmail: 'joe@example.org',
	orgphone: '07700900000',
	orgcounty: 'over18'
};

const INTERESTED_PARTY_AGENT_PERSON_NI = {
	caseref: 'BC0110002',
	behalf: 'you',
	therep: 'this is the representation',
	youname: 'Joe Bloggs',
	youcounty: 'over18',
	youmail: 'joe@example.org',
	youphone: '07700900000',
	youbuild: '123 Some Street',
	youstreet: 'Kings Cross',
	youtown: 'London',
	youcode: 'N1 9BE',
	youcountry: 'England',
	agname: 'A.N. Other',
	agbuild: 'Flat 1',
	agstreet: '72 South Street',
	agtown: 'London',
	agcode: 'N1 9BE',
	agcountry: 'England',
	agmail: 'another@example.org',
	agphone: '07700900001',
	agorgname: 'Example Company'
};

const INTERESTED_PARTY_AGENT_ORGANISATION_NI = {
	caseref: 'BC0110002',
	behalf: 'you',
	therep: 'this is the representation',
	youname: 'Another Org',
	youcounty: '',
	youmail: 'another@example.org',
	youphone: '07700900000',
	youbuild: 'Unit 1',
	youstreet: '921 North Street',
	youtown: 'London',
	youcode: 'N1 9BE',
	youcountry: 'England',
	agname: 'A.N. Other',
	agbuild: 'Flat 1',
	agstreet: '72 South Street',
	agtown: 'London',
	agcode: 'N1 9BE',
	agcountry: 'England',
	agmail: 'another@example.org',
	agphone: '07700900001',
	agorgname: 'Example Company'
};

const INTERESTED_PARTY_AGENT_FAMILY_NI = {
	caseref: 'BC0110002',
	behalf: 'you',
	therep: 'this is the representation',
	youname: 'Robinson Family',
	youcounty: 'over18',
	youmail: 'robinsons@example.org',
	youphone: '07700900002',
	youbuild: '123 Some Street',
	youstreet: 'Kings Cross',
	youtown: 'London',
	youcode: 'N1 9BE',
	youcountry: 'England',
	agname: 'A.N. Other',
	agbuild: 'Flat 1',
	agstreet: '72 South Street',
	agtown: 'London',
	agcode: 'N1 9BE',
	agcountry: 'England',
	agmail: 'another@example.org',
	agphone: '07700900001',
	agorgname: 'Example Company'
};

// format for Back Office `register-representation` message
const INTERESTED_PARTY_SELF_BACK_OFFICE = {
	referenceId: 'BC0110002-091222133021123',
	caseReference: 'BC0110002',
	originalRepresentation: 'this is the representation',
	representationFrom: 'PERSON',
	represented: {
		firstName: 'Joe',
		lastName: 'Bloggs',
		type: 'PERSON',
		under18: false,
		contactMethod: 'email',
		email: 'joe@example.org',
		phoneNumber: '07700900000',
		address: {
			addressLine1: '123 Some Street',
			addressLine2: 'Kings Cross',
			town: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		}
	},
	representationType: 'Members of the public/businesses',
	dateReceived: new Date('2022-12-09 13:30:21:123')
};

const INTERESTED_PARTY_ORGANISATION_BACK_OFFICE = {
	...INTERESTED_PARTY_SELF_BACK_OFFICE,
	representationFrom: 'ORGANISATION',

	represented: {
		...INTERESTED_PARTY_SELF_BACK_OFFICE.represented,
		type: 'ORGANISATION',
		organisationName: 'Example Company',
		jobTitle: 'CEO'
	}
};

const INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE = {
	...INTERESTED_PARTY_SELF_BACK_OFFICE,
	representationFrom: 'AGENT',
	representative: {
		firstName: 'A.N.',
		lastName: 'Other',
		type: 'AGENT',
		under18: false,
		organisationName: 'Example Company',
		jobTitle: undefined,
		contactMethod: 'email',
		email: 'another@example.org',
		phoneNumber: '07700900001',
		address: {
			addressLine1: 'Flat 1',
			addressLine2: '72 South Street',
			town: 'London',
			postcode: 'N1 9BE',
			country: 'England'
		}
	}
};

const INTERESTED_PARTY_AGENT_ORGANISATION_BACK_OFFICE = {
	...INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE,
	represented: {
		type: 'ORGANISATION',
		firstName: 'Another',
		lastName: 'Org',
		under18: false,
		address: {
			addressLine1: 'Unit 1',
			addressLine2: '921 North Street',
			country: 'England',
			postcode: 'N1 9BE',
			town: 'London'
		},
		email: 'another@example.org',
		phoneNumber: '07700900000',
		contactMethod: 'email'
	}
};

const INTERESTED_PARTY_AGENT_FAMILY_BACK_OFFICE = {
	...INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE,
	represented: {
		type: 'FAMILY_GROUP',
		firstName: 'Robinson',
		lastName: 'Family',
		under18: false,
		address: {
			addressLine1: '123 Some Street',
			addressLine2: 'Kings Cross',
			country: 'England',
			postcode: 'N1 9BE',
			town: 'London'
		},
		email: 'robinsons@example.org',
		phoneNumber: '07700900002',
		contactMethod: 'email'
	}
};

module.exports = {
	INTERESTED_PARTY_SELF_API,
	INTERESTED_PARTY_ORGANISATION_API,
	INTERESTED_PARTY_AGENT_PERSON_API,
	INTERESTED_PARTY_AGENT_ORGANISATION_API,
	INTERESTED_PARTY_AGENT_FAMILY_API,

	INTERESTED_PARTY_SELF_NI,
	INTERESTED_PARTY_ORGANISATION_NI,
	INTERESTED_PARTY_AGENT_PERSON_NI,
	INTERESTED_PARTY_AGENT_ORGANISATION_NI,
	INTERESTED_PARTY_AGENT_FAMILY_NI,

	INTERESTED_PARTY_SELF_BACK_OFFICE,
	INTERESTED_PARTY_ORGANISATION_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_PERSON_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_ORGANISATION_BACK_OFFICE,
	INTERESTED_PARTY_AGENT_FAMILY_BACK_OFFICE
};
