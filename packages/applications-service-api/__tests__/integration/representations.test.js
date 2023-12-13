const { request } = require('../__data__/supertest');
const { Op } = require('sequelize');
const config = require('../../src/lib/config');
const {
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_NI_DATA
} = require('../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../__data__/serviceUser');
const { BACK_OFFICE_DB_DOCUMENTS } = require('../__data__/documents');

const mockNIRepresentationFindAndCountAll = jest.fn();
const mockNIRepresentationFindAll = jest.fn();
const mockNIRepresentationFindOne = jest.fn();
const mockBORepresentationFindUnique = jest.fn();
const mockBOServiceUserFindUnique = jest.fn();
const mockBODocumentFindMany = jest.fn();

jest.mock('../../src/models', () => ({
	Representation: {
		findAndCountAll: (query) => mockNIRepresentationFindAndCountAll(query),
		findAll: (query) => mockNIRepresentationFindAll(query),
		findOne: (query) => mockNIRepresentationFindOne(query)
	},
	sequelize: {
		...jest.requireActual('../../src/models').sequelize,
		fn: jest.fn(),
		col: jest.fn()
	}
}));

jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		representation: {
			findUnique: (query) => mockBORepresentationFindUnique(query)
		},
		serviceUser: {
			findUnique: (query) => mockBOServiceUserFindUnique(query)
		},
		document: {
			findMany: (query) => mockBODocumentFindMany(query)
		}
	}
}));

jest.mock('../../src/repositories/document.ni.repository', () => ({
	getDocumentsByDataId: jest.fn().mockResolvedValue([])
}));

describe('api/v1/representations', () => {
	config.backOfficeIntegration.representations.getRepresentations.caseReferences = ['BC0110001'];
	describe(' GET /api/v1/representations/{representationId}?caseReference={caseReference}', () => {
		beforeEach(() => {
			mockNIRepresentationFindOne.mockResolvedValue(REPRESENTATION_NI_DATA[0]);
			mockBORepresentationFindUnique.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
			mockBOServiceUserFindUnique
				.mockResolvedValueOnce(SERVICE_USERS_BACKOFFICE_DATA[0]) // represented
				.mockResolvedValueOnce(SERVICE_USERS_BACKOFFICE_DATA[1]); // representative
			mockBODocumentFindMany.mockResolvedValue(BACK_OFFICE_DB_DOCUMENTS);
		});
		describe('when case reference is missing', () => {
			it('should return 400', async () => {
				const response = await request.get('/api/v1/representations/40');
				expect(response.status).toEqual(400);
				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: ["must have required property 'caseReference'"]
				});
			});
		});
		describe('when an error is thrown', () => {
			it('should return 500', async () => {
				mockBORepresentationFindUnique.mockRejectedValue(new Error('MOCK ERROR'));
				const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
				expect(response.status).toEqual(500);
				expect(response.text).toEqual(
					'{"code":500,"message":{"errors":["Unexpected internal server error while handling API call"]}}'
				);
			});
		});
		describe('when the case reference is ni', () => {
			describe('and the representation is found', () => {
				it('should return the correct data', async () => {
					const response = await request.get('/api/v1/representations/40?caseReference=EN010009');
					expect(response.status).toEqual(200);
					expect(response.body).toEqual(REPRESENTATION_NI_DATA[0]);
				});
			});
			describe('and the representation is not found', () => {
				it('should return 404', async () => {
					mockNIRepresentationFindOne.mockResolvedValue(null);
					const response = await request.get('/api/v1/representations/40?caseReference=EN010009');
					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['Representation with ID 40 not found']
					});
				});
			});
		});
		describe('when the case reference is backoffice', () => {
			describe('and the representation is found', () => {
				it('should return the correct data', async () => {
					const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
					expect(response.status).toEqual(200);
					expect(response.body).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
				});
			});
			describe('and the representation is not found', () => {
				it('should return 404', async () => {
					mockBORepresentationFindUnique.mockResolvedValue(null);
					const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['Representation with ID 40 not found']
					});
				});
			});
			describe('and the represented user is not found', () => {
				it('should return 404', async () => {
					jest.resetAllMocks();
					mockBORepresentationFindUnique.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
					mockBOServiceUserFindUnique
						.mockResolvedValueOnce(null) // represented
						.mockResolvedValueOnce(SERVICE_USERS_BACKOFFICE_DATA[1]); // representative
					const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['Service user not found for representation 10']
					});
				});
			});
			describe('and the representative user is not found', () => {
				it('should return data correctly', async () => {
					jest.resetAllMocks();
					mockBORepresentationFindUnique.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
					mockBOServiceUserFindUnique.mockResolvedValueOnce(SERVICE_USERS_BACKOFFICE_DATA[0]); // represented
					mockBOServiceUserFindUnique.mockResolvedValueOnce(null); // representative
					mockBODocumentFindMany.mockResolvedValue(BACK_OFFICE_DB_DOCUMENTS);
					const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
					expect(response.status).toEqual(200);
					expect(response.body).toEqual({
						...REPRESENTATION_BACKOFFICE_RESPONSE,
						Representative: ''
					});
				});
			});
		});
	});
	describe('get all representations by application id', () => {
		const defaultFilters = {
			limit: 25,
			offset: 0,
			order: [['DateRrepReceived', 'ASC'], ['PersonalName']],
			raw: true
		};
		beforeEach(() => {
			mockNIRepresentationFindAndCountAll.mockClear();
			mockNIRepresentationFindAll.mockClear();
		});
		it('happy path', async () => {
			// Arrange
			mockNIRepresentationFindAll.mockResolvedValue([]);
			mockNIRepresentationFindAndCountAll.mockResolvedValue({
				rows: REPRESENTATION_NI_DATA,
				count: 1
			});
			// Act
			const response = await request.get('/api/v1/representations?applicationId=1');
			// Assert
			expect(mockNIRepresentationFindAndCountAll).toBeCalledWith({
				...defaultFilters,
				where: {
					[Op.and]: [{ CaseReference: '1' }]
				}
			});
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: [...REPRESENTATION_NI_DATA],
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1,
				filters: {
					typeFilters: []
				}
			});
		});
		it('with pagination', async () => {
			// Arrange
			const queryParameters = ['applicationId=1', 'page=2', 'size=10'].join('&');
			mockNIRepresentationFindAll.mockResolvedValue([]);
			mockNIRepresentationFindAndCountAll.mockResolvedValue({
				rows: REPRESENTATION_NI_DATA,
				count: 11
			});
			// Act
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			// Assert
			expect(mockNIRepresentationFindAndCountAll).toBeCalledWith({
				...defaultFilters,
				limit: 10,
				offset: 10,
				where: {
					[Op.and]: [{ CaseReference: '1' }]
				}
			});
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: [...REPRESENTATION_NI_DATA],
				totalItems: 11,
				itemsPerPage: 10,
				totalPages: 2,
				currentPage: 2,
				filters: {
					typeFilters: []
				}
			});
		});
		it('with type filters', async () => {
			// Arrange
			const queryParameters = ['applicationId=1', 'type=foo'].join('&');
			mockNIRepresentationFindAll.mockResolvedValue([]);
			mockNIRepresentationFindAndCountAll.mockResolvedValue({
				rows: REPRESENTATION_NI_DATA,
				count: 1
			});
			// Act
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			// Assert
			expect(mockNIRepresentationFindAndCountAll).toBeCalledWith({
				...defaultFilters,
				where: {
					[Op.and]: [{ CaseReference: '1' }, { RepFrom: { [Op.in]: ['foo'] } }]
				}
			});
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: [...REPRESENTATION_NI_DATA],
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1,
				filters: {
					typeFilters: []
				}
			});
		});
		it('with search term', async () => {
			// Arrange
			const queryParamters = ['applicationId=1', 'searchTerm=foo'].join('&');
			mockNIRepresentationFindAll.mockResolvedValue([]);
			mockNIRepresentationFindAndCountAll.mockResolvedValue({
				rows: REPRESENTATION_NI_DATA,
				count: 1
			});
			// Act
			const response = await request.get(`/api/v1/representations?${queryParamters}`);
			// Assert
			expect(mockNIRepresentationFindAndCountAll).toBeCalledWith({
				...defaultFilters,
				where: {
					[Op.and]: [
						{ CaseReference: '1' },
						{
							[Op.or]: [
								{ PersonalName: { [Op.like]: '%foo%' } },
								{ RepresentationRedacted: { [Op.like]: '%foo%' } },
								{ Representative: { [Op.like]: '%foo%' } }
							]
						}
					]
				}
			});
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: [...REPRESENTATION_NI_DATA],
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1,
				filters: {
					typeFilters: []
				}
			});
		});
		it('with type filters and search term', async () => {
			// Arrange
			const queryParamters = ['applicationId=1', 'type=foo', 'searchTerm=bar'].join('&');
			mockNIRepresentationFindAll.mockResolvedValue([]);
			mockNIRepresentationFindAndCountAll.mockResolvedValue({
				rows: REPRESENTATION_NI_DATA,
				count: 1
			});
			// Act
			const response = await request.get(`/api/v1/representations?${queryParamters}`);
			// Assert
			expect(mockNIRepresentationFindAndCountAll).toBeCalledWith({
				...defaultFilters,
				where: {
					[Op.and]: [
						{ CaseReference: '1' },
						{ RepFrom: { [Op.in]: ['foo'] } },
						{
							[Op.or]: [
								{ PersonalName: { [Op.like]: '%bar%' } },
								{ RepresentationRedacted: { [Op.like]: '%bar%' } },
								{ Representative: { [Op.like]: '%bar%' } }
							]
						}
					]
				}
			});
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: [...REPRESENTATION_NI_DATA],
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1,
				filters: {
					typeFilters: []
				}
			});
		});
	});
});
