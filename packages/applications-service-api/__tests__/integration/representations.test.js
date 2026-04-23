const { request } = require('../__data__/supertest');
const {
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_BACKOFFICE_DATA
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
		describe('and the representation is found', () => {
			it('should return the correct data', async () => {
				const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
				expect(response.status).toEqual(200);
				expect(response.body).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
			});
		});
		describe('case reference and representation association', () => {
			it('should return the representation if the case reference matches the project', async () => {
				mockBORepresentationFindFirst.mockResolvedValue({
					...REPRESENTATION_BACKOFFICE_DATA,
					represented: SERVICE_USERS_BACKOFFICE_DATA[0],
					representative: SERVICE_USERS_BACKOFFICE_DATA[1],
					caseReference: 'BC0110001'
				});
				const response = await request.get('/api/v1/representations/40?caseReference=BC0110001');
				expect(response.status).toEqual(200);
			});

			it('should return 404 if the case reference does not match the representation project', async () => {
				mockBORepresentationFindFirst.mockResolvedValue(null);
				const response = await request.get('/api/v1/representations/40?caseReference=BC0999999');

				expect(response.status).toEqual(404);
				expect(response.body).toEqual({
					code: 404,
					errors: ['Representation with ID 40 not found']
				});
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
						'{"code":500,"errors":["Unexpected internal server error while handling API call"]}'
					);
				});
			});
		});
	});
});
