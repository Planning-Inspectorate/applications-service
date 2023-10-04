/* eslint-disable consistent-return */
const {
	getFilters,
	getRepresentationsForApplication,
	getRepresentationById
} = require('../../../src/services/representation.service');
const {
	getRepresentationsWithCount: getRepresentationsWithCountRepository,
	getRepresentations: getRepresentationsRepository,
	getRepresentationById: getRepresentationByIdRepository
} = require('../../../src/repositories/representation.ni.repository');
const { Op } = require('sequelize');
const db = require('../../../src/models');

const repMockData = {
	count: 2,
	representations: [
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

jest.mock('../../../src/repositories/representation.ni.repository', () => {
	return {
		getRepresentationsWithCount: jest.fn().mockResolvedValue(repMockData),
		getRepresentations: jest.fn(),
		getRepresentationById: jest.fn().mockResolvedValue(repMockData.representations[0])
	};
});

describe('getRepresentationsForApplication', () => {
	beforeAll(() => {
		// Arrange
		getRepresentationsRepository.mockResolvedValue([]);
	});
	it('should call getRepresentationsWithCountRepository with correct params', async () => {
		// Act
		await getRepresentationsForApplication({
			applicationId: 'EN010009',
			page: 1,
			size: 25,
			type: 'Members of the Public/Businesses',
			searchTerm: 'Frosty'
		});
		// Assert
		expect(getRepresentationsWithCountRepository).toBeCalledWith({
			applicationId: 'EN010009',
			offset: 0,
			limit: 25,
			order: [['DateRrepReceived', 'ASC'], ['PersonalName']],
			type: 'Members of the Public/Businesses',
			searchTerm: 'Frosty'
		});
	});
	it('should return representations', async () => {
		// Act
		const data = await getRepresentationsForApplication({
			applicationId: 'EN010009',
			page: 1,
			size: 25,
			type: 'Members of the Public/Businesses',
			searchTerm: 'Frosty'
		});
		// Assert
		expect(data).toEqual({
			representations: repMockData.representations,
			totalItems: 2,
			itemsPerPage: 25,
			totalPages: 1,
			currentPage: 1,
			filters: {
				typeFilters: []
			}
		});
	});
});

describe('getRepresentationById', () => {
	it('should call getRepresentationByIdRepository', async () => {
		// Act
		await getRepresentationById(21);
		// Assert
		expect(getRepresentationByIdRepository).toBeCalledWith(21);
	});
	it('should return representation', async () => {
		// Act
		const data = await getRepresentationById(21);
		// Assert
		expect(data).toEqual(repMockData.representations[0]);
	});
});

describe('getFilters', () => {
	beforeAll(() => {
		getRepresentationsRepository.mockResolvedValue(filtersMockData);
	});
	it('should call getRepresentationsRepository with correct params', async () => {
		// Act
		await getFilters('RepFrom', 'EN010009');
		// Assert
		expect(getRepresentationsRepository).toBeCalledWith({
			where: { CaseReference: 'EN010009', RepFrom: { [Op.ne]: null } },
			attributes: ['RepFrom', [db.sequelize.fn('COUNT', db.sequelize.col('RepFrom')), 'count']],
			group: ['RepFrom']
		});
	});
	it('should return filters', async () => {
		// Act
		const data = await getFilters('RepFrom', 'EN010009');
		// Assert
		expect(data).toEqual(filtersMockData);
	});
});
