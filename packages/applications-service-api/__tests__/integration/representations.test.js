const { request } = require('../__data__/supertest');
const { REPRESENTATION_NI_DATA } = require('../__data__/representation');
const { Op } = require('sequelize');
const mockFindAndCountAll = jest.fn();
const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
jest.mock('../../src/models', () => ({
	Representation: {
		findAndCountAll: (query) => mockFindAndCountAll(query),
		findAll: (query) => mockFindAll(query),
		findOne: (query) => mockFindOne(query)
	},
	sequelize: {
		...jest.requireActual('../../src/models').sequelize,
		fn: jest.fn(),
		col: jest.fn()
	}
}));

jest.mock('../../src/repositories/document.ni.repository', () => ({
	getDocumentsByDataId: jest.fn().mockResolvedValue([])
}));

describe('api/v1/representations', () => {
	describe('get single representation by id', () => {
		it('happy path', async () => {
			// Arrange
			mockFindOne.mockResolvedValue(REPRESENTATION_NI_DATA[0]);
			// Act
			const response = await request.get('/api/v1/representations/2');
			// Assert
			expect(mockFindOne).toBeCalledWith({ where: { ID: '2' }, raw: true });
			expect(response.status).toEqual(200);
			expect(response.body).toEqual(REPRESENTATION_NI_DATA[0]);
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
			mockFindAndCountAll.mockClear();
			mockFindAll.mockClear();
		});
		it('happy path', async () => {
			// Arrange
			mockFindAll.mockResolvedValue([]);
			mockFindAndCountAll.mockResolvedValue({ rows: REPRESENTATION_NI_DATA, count: 1 });
			// Act
			const response = await request.get('/api/v1/representations?applicationId=1');
			// Assert
			expect(mockFindAndCountAll).toBeCalledWith({
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
			mockFindAll.mockResolvedValue([]);
			mockFindAndCountAll.mockResolvedValue({ rows: REPRESENTATION_NI_DATA, count: 11 });
			// Act
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			// Assert
			expect(mockFindAndCountAll).toBeCalledWith({
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
			mockFindAll.mockResolvedValue([]);
			mockFindAndCountAll.mockResolvedValue({ rows: REPRESENTATION_NI_DATA, count: 1 });
			// Act
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			// Assert
			expect(mockFindAndCountAll).toBeCalledWith({
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
			mockFindAll.mockResolvedValue([]);
			mockFindAndCountAll.mockResolvedValue({ rows: REPRESENTATION_NI_DATA, count: 1 });
			// Act
			const response = await request.get(`/api/v1/representations?${queryParamters}`);
			// Assert
			expect(mockFindAndCountAll).toBeCalledWith({
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
			mockFindAll.mockResolvedValue([]);
			mockFindAndCountAll.mockResolvedValue({ rows: REPRESENTATION_NI_DATA, count: 1 });
			// Act
			const response = await request.get(`/api/v1/representations?${queryParamters}`);
			// Assert
			expect(mockFindAndCountAll).toBeCalledWith({
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
