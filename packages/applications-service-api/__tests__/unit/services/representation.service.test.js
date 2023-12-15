/* eslint-disable consistent-return */
const {
	getFilters,
	getRepresentationsForApplication,
	getRepresentationById
} = require('../../../src/services/representation.service');
const config = require('../../../src/lib/config');
const {
	getRepresentationsWithCount: getRepresentationsWithCountNIRepository,
	getRepresentations: getRepresentationsNIRepository,
	getRepresentationById: getRepresentationByIdNIRepository
} = require('../../../src/repositories/representation.ni.repository');
const {
	getDocumentsByDataId: getDocumentsByDataIdNIRepository
} = require('../../../src/repositories/document.ni.repository');

const {
	getRepresentationById: getRepresentationByBORepository,
	getRepresentationsByCaseReference: getRepresentationsByCaseReferenceBORepository
} = require('../../../src/repositories/representation.backoffice.repository');
const {
	getServiceUserById: getServiceUserByIdBORepository
} = require('../../../src/repositories/serviceUser.backoffice.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../../../src/repositories/document.backoffice.repository');
const {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi
} = require('../../../src/utils/representation.mapper');
const {
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_NI_DATA,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
} = require('../../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../../__data__/serviceUser');
const { Op } = require('sequelize');
const db = require('../../../src/models');

const filtersMockData = [
	{ RepFrom: 'Members of the Public/Businesses', count: 23 },
	{ RepFrom: 'Parish Councils', count: 2 }
];

jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/repositories/representation.ni.repository');
jest.mock('../../../src/repositories/representation.backoffice.repository');
jest.mock('../../../src/repositories/serviceUser.backoffice.repository');
jest.mock('../../../src/repositories/document.backoffice.repository');
jest.mock('../../../src/utils/representation.mapper');

config.backOfficeIntegration.representations.getRepresentations.caseReferences = ['BC010001'];

describe('representation.service', () => {
	describe('getRepresentationsForApplication', () => {
		describe('when case reference is back office', () => {
			beforeEach(() => {
				getRepresentationsByCaseReferenceBORepository.mockResolvedValue(
					REPRESENTATIONS_BACKOFFICE_DATA
				);
				getServiceUserByIdBORepository.mockImplementation((id) => {
					return Promise.resolve(
						SERVICE_USERS_BACKOFFICE_DATA.find((user) => user.serviceUserId === id)
					);
				});
				mapBackOfficeRepresentationsToApi.mockReturnValue(REPRESENTATIONS_BACKOFFICE_RESPONSE);
			});
			it('should call getRepresentationsByCaseReferenceBORepository with correct params', async () => {
				await getRepresentationsForApplication({ caseReference: 'BC010001' });
				expect(getRepresentationsByCaseReferenceBORepository).toBeCalledWith({
					caseReference: 'BC010001'
				});
			});
			it('should call getServiceUserByIdBORepository for each representedId', async () => {
				await getRepresentationsForApplication({ caseReference: 'BC010001' });
				REPRESENTATIONS_BACKOFFICE_DATA.forEach((representation, index) => {
					expect(getServiceUserByIdBORepository).toBeCalledWith(
						REPRESENTATIONS_BACKOFFICE_DATA[index].representedId
					);
				});
			});
			it('should call getServiceUserByIdBORepository for each representativeId', async () => {
				await getRepresentationsForApplication({ caseReference: 'BC010001' });
				REPRESENTATIONS_BACKOFFICE_DATA.forEach((representation) => {
					expect(getServiceUserByIdBORepository).toBeCalledWith(representation.representativeId);
				});
			});
			it('should call mapBackOfficeRepresentationsToApi with correct params', async () => {
				await getRepresentationsForApplication({ caseReference: 'BC010001' });
				const mockRepresented = REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
					representation,
					represented: SERVICE_USERS_BACKOFFICE_DATA[0],
					representative: SERVICE_USERS_BACKOFFICE_DATA[1]
				}));
				expect(mapBackOfficeRepresentationsToApi).toBeCalledWith(mockRepresented);
			});
			it('should return representations', async () => {
				const data = await getRepresentationsForApplication({ caseReference: 'BC010001' });
				expect(data).toEqual({
					representations: REPRESENTATIONS_BACKOFFICE_RESPONSE,
					// TODO: Pagination & Filters will done in ASB-2097
					totalItems: 0,
					itemsPerPage: 0,
					totalPages: 0,
					currentPage: 0,
					filters: { typeFilters: [] }
				});
			});
		});
		describe('when case reference is ni', () => {
			beforeEach(() => {
				getRepresentationsWithCountNIRepository.mockResolvedValue({
					count: 1,
					representations: REPRESENTATION_NI_DATA
				});
				getDocumentsByDataIdNIRepository.mockResolvedValue([]);
			});
			it('should call getRepresentationsWithCountNIRepository with correct params', async () => {
				await getRepresentationsForApplication({ caseReference: 'EN010009' });
				expect(getRepresentationsWithCountNIRepository).toBeCalledWith({
					caseReference: 'EN010009',
					offset: 0,
					limit: 25,
					order: [['DateRrepReceived', 'ASC'], ['PersonalName']]
				});
			});
			it('should get filters by calling getRepresentationsNIRepository', async () => {
				await getRepresentationsForApplication({ caseReference: 'EN010009' });
				expect(getRepresentationsNIRepository).toBeCalledWith({
					where: { CaseReference: 'EN010009', RepFrom: { [Op.ne]: null } },
					attributes: ['RepFrom', [db.sequelize.fn('COUNT', db.sequelize.col('RepFrom')), 'count']],
					group: ['RepFrom']
				});
			});
			it('should return representations', async () => {
				await getRepresentationsForApplication({ caseReference: 'EN010009' });
				expect(getRepresentationsWithCountNIRepository).toBeCalledWith({
					caseReference: 'EN010009',
					offset: 0,
					limit: 25,
					order: [['DateRrepReceived', 'ASC'], ['PersonalName']]
				});
				``;
			});
		});
	});
	describe('getRepresentationById', () => {
		describe('when case reference is back office', () => {
			beforeEach(() => {
				getRepresentationByBORepository.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
				getDocumentsByIdsBORepository.mockResolvedValue([]);
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
	describe('getNIFilters', () => {
		beforeAll(() => {
			getRepresentationsNIRepository.mockResolvedValue(filtersMockData);
		});
		it('should call getRepresentationsNIRepository with correct params', async () => {
			// Act
			await getFilters('RepFrom', 'EN010009');
			// Assert
			expect(getRepresentationsNIRepository).toBeCalledWith({
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
});
