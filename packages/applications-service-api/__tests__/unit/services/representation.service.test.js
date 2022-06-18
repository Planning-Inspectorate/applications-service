/* eslint-disable consistent-return */
const {
	getFilters,
	getRepresentationsForApplication,
	getRepresentationById
} = require('../../../src/services/representation.service');

const repMockData = {
	count: 2,
	rows: [
		{
			ID: 21,
			ProjectName: 'Auto_Test',
			CaseReference: 'EN010009',
			DataID: null,
			UniqueReference: 'TR010109-34671',
			WebReference: null,
			PersonalName: 'Frosty Flights (Frosty Flights)',
			Representative: null,
			IndvdlOnBhalfName: null,
			OrgOnBhalfName: null,
			AgentOrgOnBhalfContactName: null,
			RepFrom: 'Parish Councils',
			InterestInLand: null,
			SpecifyOther: null,
			CompulsoryAcquisitionHearing: null,
			RepresentationOriginal: null,
			RepresentationRedacted: 'Some comments',
			RelevantOrNot: null,
			SubmitFurtherWrittenReps: null,
			PreliminaryMeeting: null,
			OpenFloorHearings: null,
			IssuesSpecificHearings: null,
			DateRrepReceived: '2021-08-01T00:00:00.000Z',
			DoNotPublish: null,
			Attachments: 'TR010109-000002'
		},
		{
			ID: 26,
			ProjectName: 'HZN Reg 51 Testing',
			CaseReference: 'EN010009',
			DataID: null,
			UniqueReference: 'TR010140-34720',
			WebReference: null,
			PersonalName: 'Frosty Fliers (Frosty Fliers )',
			Representative: null,
			IndvdlOnBhalfName: null,
			OrgOnBhalfName: null,
			AgentOrgOnBhalfContactName: null,
			RepFrom: 'Parish Councils',
			InterestInLand: null,
			SpecifyOther: null,
			CompulsoryAcquisitionHearing: null,
			RepresentationOriginal: null,
			RepresentationRedacted: 'Some comments',
			RelevantOrNot: null,
			SubmitFurtherWrittenReps: null,
			PreliminaryMeeting: null,
			OpenFloorHearings: null,
			IssuesSpecificHearings: null,
			DateRrepReceived: '2021-03-14T00:00:00.000Z',
			DoNotPublish: null,
			Attachments: 'TR010140-000002'
		}
	]
};

const filtersMockData = [
	{ RepFrom: 'Members of the Public/Businesses', count: 23 },
	{ RepFrom: 'Parish Councils', count: 2 }
];

jest.mock('../../../src/models', () => {
	// eslint-disable-next-line global-require
	const SequelizeMock = require('sequelize-mock');
	const dbMock = new SequelizeMock();
	const Representation = dbMock.define('Representation');

	Representation.$queryInterface.$useHandler((query) => {
		if (query === 'findAndCountAll') {
			return Representation.build({ ...repMockData });
		}
		if (query === 'findOne') {
			return Representation.build({ ...repMockData.rows[0] });
		}
		if (query === 'findAll') {
			return Representation.build({ ...filtersMockData });
		}
	});

	const db = {
		Representation,
		sequelize: { fn: jest.fn(), col: jest.fn() }
	};
	return db;
});

describe('getRepresentationsForApplication', () => {
	it('should get representations for application from mock', async () => {
		const data = await getRepresentationsForApplication('EN010009', 1, 'Frosty', 'Parish Councils');
		const result = { ...data.dataValues };
		delete result.id;
		delete result.createdAt;
		delete result.updatedAt;
		expect(result).toEqual(repMockData);
	});
});

describe('getRepresentationById', () => {
	it('should get representation', async () => {
		const data = await getRepresentationById(21);
		const result = { ...data.dataValues };
		delete result.id;
		delete result.createdAt;
		delete result.updatedAt;
		expect(result).toEqual(repMockData.rows[0]);
	});
});

describe('getFilters', () => {
	it('should get filters', async () => {
		const data = await getFilters('RepFrom', 'EN010009');
		const result = { ...data.dataValues };
		delete result.id;
		delete result.createdAt;
		delete result.updatedAt;
		expect(Object.values(result)).toEqual(filtersMockData);
	});
});
