const { request } = require('../__data__/supertest');
const {
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
} = require('../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../__data__/serviceUser');
const { BACK_OFFICE_DB_DOCUMENTS } = require('../__data__/documents');

const mockBORepresentationFindFirst = jest.fn();
const mockBORepresentationFindMany = jest.fn();
const mockBORepresentationCount = jest.fn();
const mockBODocumentFindMany = jest.fn();
const mockBOGroupBy = jest.fn();

jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		representation: {
			findFirst: (query) => mockBORepresentationFindFirst(query),
			findMany: (query) => mockBORepresentationFindMany(query),
			count: (query) => mockBORepresentationCount(query),
			groupBy: (query) => mockBOGroupBy(query)
		},
		document: {
			findMany: (query) => mockBODocumentFindMany(query)
		}
	}
}));

describe('api/v1/representations', () => {
	describe(' GET /api/v1/representations/{representationId}?caseReference={caseReference}', () => {
		beforeEach(() => {
			mockBORepresentationFindFirst.mockResolvedValue({
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			});
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
				mockBORepresentationFindFirst.mockRejectedValue(new Error('MOCK ERROR'));
				const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
				expect(response.status).toEqual(500);
				expect(response.text).toEqual(
					'{"code":500,"message":{"errors":["Unexpected internal server error while handling API call"]}}'
				);
			});
		});
		describe('and the representation is found', () => {
			it('should return the correct data', async () => {
				const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
				expect(response.status).toEqual(200);
				expect(response.body).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
			});
		});
		describe('and the representation is not found', () => {
			it('should return 404', async () => {
				mockBORepresentationFindFirst.mockResolvedValue(null);
				const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
				expect(response.status).toEqual(404);
				expect(response.body).toEqual({
					code: 404,
					errors: ['Representation with ID 40 not found']
				});
			});
		});
	});
	describe(' GET /api/v1/representations?caseReference={caseReference}', () => {
		describe('when case reference is missing', () => {
			it('should return 400', async () => {
				const response = await request.get('/api/v1/representations');
				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: ["must have required property 'caseReference'"]
				});
			});
		});
		describe('when an error is thrown', () => {
			it('should return 500', async () => {
				mockBORepresentationFindMany.mockRejectedValue(new Error('MOCK ERROR'));
				const response = await request.get('/api/v1/representations?caseReference=BC0110001');
				expect(response.status).toEqual(500);
				expect(response.text).toEqual(
					'{"code":500,"message":{"errors":["Unexpected internal server error while handling API call"]}}'
				);
			});
		});
		const defaultFilters = {
			where: {
				AND: [
					{ caseReference: 'BC0110001' },
					{
						status: {
							in: ['PUBLISHED', 'published']
						},
						OR: [
							{
								AND: [
									{ represented: { firstName: { not: null } } },
									{ represented: { firstName: { not: '' } } }
								]
							},
							{
								AND: [
									{ represented: { lastName: { not: null } } },
									{ represented: { lastName: { not: '' } } }
								]
							},
							{
								AND: [
									{ represented: { organisationName: { not: null } } },
									{ represented: { organisationName: { not: '' } } }
								]
							}
						]
					}
				]
			},
			orderBy: {
				dateReceived: 'asc'
			},
			skip: 0,
			take: 25,
			include: {
				represented: true,
				representative: true
			}
		};
		const searchTermQuerySection = {
			OR: [
				{ representationComment: { contains: 'foo bar' } },
				{ representative: { organisationName: { contains: 'foo bar' } } },
				{ represented: { organisationName: { contains: 'foo bar' } } },
				{
					OR: [
						{ represented: { firstName: { contains: 'foo' } } },
						{ represented: { lastName: { contains: 'foo' } } },
						{ representative: { firstName: { contains: 'foo' } } },
						{ representative: { lastName: { contains: 'foo' } } }
					]
				},
				{
					OR: [
						{ represented: { firstName: { contains: 'bar' } } },
						{ represented: { lastName: { contains: 'bar' } } },
						{ representative: { firstName: { contains: 'bar' } } },
						{ representative: { lastName: { contains: 'bar' } } }
					]
				}
			]
		};
		beforeEach(() => {
			mockBORepresentationFindMany.mockResolvedValue(
				REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
					...representation,
					represented: SERVICE_USERS_BACKOFFICE_DATA[0],
					representative: SERVICE_USERS_BACKOFFICE_DATA[1]
				}))
			);
			mockBORepresentationCount.mockResolvedValue(1);
			mockBODocumentFindMany.mockResolvedValue(BACK_OFFICE_DB_DOCUMENTS);
			mockBOGroupBy.mockResolvedValue([]);
		});

		it('happy path', async () => {
			const queryParameters = ['caseReference=BC0110001'].join('&');
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			expect(mockBORepresentationFindMany).toBeCalledWith(defaultFilters);
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: REPRESENTATIONS_BACKOFFICE_RESPONSE,
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
			const queryParameters = ['caseReference=BC0110001', 'page=2', 'size=50'].join('&');
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			expect(mockBORepresentationFindMany).toBeCalledWith({
				...defaultFilters,
				skip: 50,
				take: 50
			});
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: REPRESENTATIONS_BACKOFFICE_RESPONSE,
				totalItems: 1,
				itemsPerPage: 50,
				totalPages: 1,
				currentPage: 2,
				filters: {
					typeFilters: []
				}
			});
		});
		it('with type filters', async () => {
			const queryParameters = ['caseReference=BC0110001', 'type=foo'].join('&');
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			expect(mockBORepresentationFindMany).toBeCalledWith({
				...defaultFilters,
				where: {
					AND: [
						...defaultFilters.where.AND,
						{
							representationType: {
								in: ['foo']
							}
						}
					]
				}
			});
			expect(response.status).toEqual(200);
		});

		it('with search term', async () => {
			const queryParameters = ['caseReference=BC0110001', 'searchTerm=foo bar'].join('&');
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			expect(mockBORepresentationFindMany).toBeCalledWith({
				...defaultFilters,
				where: {
					AND: [...defaultFilters.where.AND, searchTermQuerySection]
				}
			});
			expect(response.status).toEqual(200);
		});
		it('with type filters and search term', async () => {
			const queryParameters = ['caseReference=BC0110001', 'type=foo', 'searchTerm=foo bar'].join(
				'&'
			);
			const response = await request.get(`/api/v1/representations?${queryParameters}`);
			expect(mockBORepresentationFindMany).toBeCalledWith({
				...defaultFilters,
				where: {
					AND: [
						...defaultFilters.where.AND,
						searchTermQuerySection,
						{
							representationType: {
								in: ['foo']
							}
						}
					]
				}
			});
			expect(response.status).toEqual(200);
		});
		it('no representations found', async () => {
			mockBORepresentationFindMany.mockResolvedValue([]);
			mockBORepresentationCount.mockResolvedValue(0);
			const response = await request.get('/api/v1/representations?caseReference=BC0110001');
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				representations: [],
				totalItems: 0,
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
