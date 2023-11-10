/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const { createInterestedParty } = require('../../../src/controllers/interested-party');

const ipDataOwnBehalf = {
	ID: 30000120,
	caseref: 'EN010009',
	behalf: 'me',
	mename: 'David White',
	mebuild: 'Temple Quay',
	mestreet: '',
	metown: 'BRISTOL',
	mecounty: '',
	mecode: 'BS1 6PN',
	mecountry: 'United Kingdom',
	memail: 'david.white@planninginspectorate.gov.uk',
	mephone: '0303 111 111',
	orgname: '',
	contactName: '',
	contactJob: '',
	orgbuild: '',
	orgstreet: '',
	orgtown: '',
	orgcounty: '',
	orgcode: '',
	orgcountry: '',
	orgmail: '',
	orgphone: '',
	youname: '',
	youbuild: '',
	youstreet: '',
	youtown: '',
	youcounty: '',
	youcode: '',
	youcountry: '',
	youmail: '',
	youphone: '',
	agname: '',
	agorgname: '',
	agbuild: '',
	agstreet: '',
	agtown: '',
	agcounty: '',
	agcode: '',
	agcountry: '',
	agmail: '',
	agphone: '',
	therep: 'I dont like noise either',
	validated: '2021-06-22T14:45:46.000Z',
	emailed: '2021-06-22T14:45:46.000Z',
	exported: null,
	web_ref: 1
};

const ipDataOrgBehalf = {
	ID: 30000135,
	caseref: 'EN010009',
	behalf: 'them',
	mename: '',
	mebuild: '',
	mestreet: '',
	metown: '',
	mecounty: '',
	mecode: '',
	mecountry: '',
	memail: '',
	mephone: '',
	orgname: 'Ministry of Coffee and Social Affairs',
	contactName: 'Mr Bean',
	contactJob: 'Coffee connoisseur',
	orgbuild: 'Coffee Building',
	orgstreet: 'Coffee Wall Street',
	orgtown: 'London',
	orgcounty: 'over18',
	orgcode: 'CO127FE',
	orgcountry: 'UK',
	orgmail: 'Mr.Bean@MinistryofCoffeeandSocialAffairs.gov.uk',
	orgphone: '0132232432',
	youname: '',
	youbuild: '',
	youstreet: '',
	youtown: '',
	youcounty: '',
	youcode: '',
	youcountry: '',
	youmail: '',
	youphone: '',
	agname: '',
	agorgname: '',
	agbuild: '',
	agstreet: '',
	agtown: '',
	agcounty: '',
	agcode: '',
	agcountry: '',
	agmail: '',
	agphone: '',
	therep: 'I dont like noise either',
	validated: '2021-06-22T14:45:46.000Z',
	emailed: '2021-06-22T14:45:46.000Z',
	exported: null,
	web_ref: 1
};

const createIpOnOwnBehalf = {
	case_ref: 'EN010009',
	behalf: 'me',
	'full-name': 'Humpty Dumpty',
	'over-18': 'yes',
	address: {
		line1: 'Queens Building',
		line2: 'Queens Wall Street',
		line3: 'London',
		postcode: 'HE127TY',
		country: 'UK'
	},
	email: 'test@test.com',
	telephone: '0132232432'
};

const createIpOnOrgBehalf = {
	case_ref: 'EN010009',
	behalf: 'them',
	'full-name': 'Mr Bean',
	'over-18': 'yes',
	'organisation-name': 'Ministry of Coffee and Social Affairs',
	role: 'Coffee connoisseur',
	address: {
		line1: 'Coffee Building',
		line2: 'Coffee Wall Street',
		line3: 'London',
		postcode: 'CO127FE',
		country: 'UK'
	},
	email: 'test@test.com',
	telephone: '0132232432'
};

const projectData = {
	DateOfRelevantRepresentationClose: '2024-12-09',
	ProjectEmailAddress: 'david.white@pins.gsi.gov.uk',
	ProjectName: 'St James Barton Giant Wind Turbine',
	Region: 'Wales'
};

const createIpOnAgentBehalf = {
	case_ref: 'EN010009',
	behalf: 'you',
	representing: 'person|organisation|family',
	representee: {
		'full-name': 'Harry Potter',
		'over-18': 'yes',
		address: {
			line1: '4',
			line2: 'Privet Drive',
			line3: 'Little Whinging',
			postcode: 'RG12 9FG',
			country: 'UK'
		},
		email: 'harry.potter@hogwarts.org.uk',
		telephone: '0132232432'
	},
	representor: {
		'full-name': 'Hermione Granger',
		'over-18': 'yes',
		address: {
			line1: '95',
			line2: 'Boar Lane',
			line3: 'Sellack',
			postcode: 'HR9 6LR',
			country: 'UK'
		},
		email: 'hermione.granger@hogwarts.org.uk',
		telephone: '0137732432',
		'organisation-name': 'Hogwarts School of Witchcraft and Wizardry'
	}
};

jest.mock('../../../src/models', () => {
	// eslint-disable-next-line global-require
	const SequelizeMock = require('sequelize-mock');
	const dbMock = new SequelizeMock();
	const InterestedParty = dbMock.define('InterestedParty');
	const Project = dbMock.define('Project');

	InterestedParty.$queryInterface.$useHandler((query, queryOptions) => {
		if (query === 'findOne') {
			if (queryOptions[0].where.caseRef === 'EN010009' || queryOptions[0].where.ID === '30000120') {
				return InterestedParty.build({ ...ipDataOwnBehalf }, { ...projectData });
			}
			if (queryOptions[0].where.ID === '30000135') {
				return InterestedParty.build({ ...ipDataOrgBehalf }, { ...projectData });
			}

			return null;
		}
		if (query === 'create') {
			return InterestedParty.build({ ...createIpOnOwnBehalf });
		}
		if (query === 'update') {
			if (queryOptions[1].where.ID === 30000120) {
				return InterestedParty.build({ ...ipDataOwnBehalf });
			}
			return null;
		}
	});
	Project.$queryInterface.$useHandler((query, queryOptions) => {
		if (query === 'findOne') {
			if (queryOptions[0].where.CaseReference === 'EN010009') {
				return Project.build({ ...projectData });
			}
			return null;
		}
	});
	const db = {
		InterestedParty,
		Project
	};
	return db;
});

describe('insertInterestedParty', () => {
	it('should create an interested party on own behalf', async () => {
		const req = httpMocks.createRequest({
			body: {
				...createIpOnOwnBehalf
			}
		});
		const res = httpMocks.createResponse();
		await createInterestedParty(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
	});

	it('should create an interested party on organisation behalf', async () => {
		const req = httpMocks.createRequest({
			body: {
				...createIpOnOrgBehalf
			}
		});
		const res = httpMocks.createResponse();
		await createInterestedParty(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
	});

	it('should create an interested party on agent behalf', async () => {
		const req = httpMocks.createRequest({
			body: {
				...createIpOnAgentBehalf
			}
		});
		const res = httpMocks.createResponse();
		await createInterestedParty(req, res);

		expect(res._getStatusCode()).toEqual(StatusCodes.CREATED);
	});
});
