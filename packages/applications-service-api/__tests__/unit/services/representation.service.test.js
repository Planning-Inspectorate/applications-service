/* eslint-disable consistent-return */
const {
	getFilters,
	getRepresentationsForApplication,
	getRepresentationById
} = require('../../../src/services/representation.service');
const config = require('../../../src/lib/config');
const {
	getRepresentationsWithCount: getRepresentationsWithCountRepository,
	getRepresentations: getRepresentationsRepository,
	getRepresentationById: getRepresentationByIdNIRepository
} = require('../../../src/repositories/representation.ni.repository');
const {
	getDocumentsByDataId: getDocumentsByDataIdNIRepository
} = require('../../../src/repositories/document.ni.repository');

const {
	getRepresentationById: getRepresentationByBORepository
} = require('../../../src/repositories/representation.backoffice.repository');
const {
	getServiceUserById: getServiceUserByIdBORepository
} = require('../../../src/repositories/serviceUser.backoffice.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../../../src/repositories/document.backoffice.repository');
const { mapBackOfficeRepresentationToApi } = require('../../../src/utils/representation.mapper');
const {
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_NI_DATA
} = require('../../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../../__data__/serviceUser');
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
		getRepresentationById: jest.fn()
	};
});
jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/repositories/representation.backoffice.repository');
jest.mock('../../../src/repositories/serviceUser.backoffice.repository');
jest.mock('../../../src/repositories/document.backoffice.repository');
jest.mock('../../../src/utils/representation.mapper');

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

config.backOfficeIntegration.representations.getRepresentations.caseReferences = ['BC010001'];
describe('getRepresentationById', () => {
	describe('when case reference is back office', () => {
		beforeEach(() => {
			getRepresentationByBORepository.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
			getServiceUserByIdBORepository
				.mockResolvedValueOnce(SERVICE_USERS_BACKOFFICE_DATA[0])
				.mockResolvedValueOnce(SERVICE_USERS_BACKOFFICE_DATA[1]);
			mapBackOfficeRepresentationToApi.mockReturnValue(REPRESENTATION_BACKOFFICE_RESPONSE);
		});
		it('should call getRepresentationByIdBORepository with correct params', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(getRepresentationByBORepository).toBeCalledWith('1');
		});
		it('should return undefined if no representation found', async () => {
			getRepresentationByBORepository.mockResolvedValue(null);
			const data = await getRepresentationById('1', 'BC010001');
			expect(data).toBeUndefined();
		});
		it('should call getServiceUserByIdBORepository to get represented', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(getServiceUserByIdBORepository).toBeCalledWith(
				REPRESENTATION_BACKOFFICE_DATA.representedId
			);
		});
		it('should throw not found error if represented not found', async () => {
			jest.resetAllMocks();
			getRepresentationByBORepository.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
			getServiceUserByIdBORepository.mockResolvedValue(null);
			let error;
			try {
				await getRepresentationById('1', 'BC010001');
			} catch (e) {
				error = e;
			}
			expect(error).toBeDefined();
			expect(error.code).toEqual(404);
			expect(error.message).toEqual({ errors: ['Service user not found for representation 10'] });
		});
		it('should call getServiceUserByIdBORepository to get representative', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(getServiceUserByIdBORepository).toBeCalledWith(
				REPRESENTATION_BACKOFFICE_DATA.representativeId
			);
		});
		it('should call getDocumentsByIdsBORepository with correct params', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(getDocumentsByIdsBORepository).toBeCalledWith(
				REPRESENTATION_BACKOFFICE_DATA.attachmentIds
			);
		});
		it('should call mapBackOfficeRepresentationToApi with correct params', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(mapBackOfficeRepresentationToApi).toBeCalledWith(
				REPRESENTATION_BACKOFFICE_DATA,
				SERVICE_USERS_BACKOFFICE_DATA[0],
				SERVICE_USERS_BACKOFFICE_DATA[1],
				[]
			);
		});
		it('should return representation', async () => {
			const data = await getRepresentationById('1', 'BC010001');
			expect(data).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
		});
	});
	describe('when case reference is ni', () => {
		beforeEach(() => {
			getRepresentationByIdNIRepository.mockResolvedValue(REPRESENTATION_NI_DATA[0]);
			getDocumentsByDataIdNIRepository.mockResolvedValue([]);
		});
		it('should call getRepresentationByIdNIRepository with correct params', async () => {
			await getRepresentationById('1', 'EN010009');
			expect(getRepresentationByIdNIRepository).toBeCalledWith('1');
		});
		it('return undefined if no representation found', async () => {
			getRepresentationByIdNIRepository.mockResolvedValue(null);
			const data = await getRepresentationById('1', 'EN010009');
			expect(data).toBeUndefined();
		});
		it('should call getDocumentsByDataIdNIRepository with correct params', async () => {
			await getRepresentationById('1', 'EN010009');
			expect(getDocumentsByDataIdNIRepository).toBeCalledWith(
				REPRESENTATION_NI_DATA[0].Attachments.split(',')
			);
		});
		it('should return representation', async () => {
			const data = await getRepresentationById('1', 'EN010009');
			expect(data).toEqual(REPRESENTATION_NI_DATA[0]);
		});
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
