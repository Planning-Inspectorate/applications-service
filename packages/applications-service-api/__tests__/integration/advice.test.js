const {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA,
	ADVICE_NI_RESPONSE,
	ADVICE_NI_DATA
} = require('../__data__/advice');
const { request } = require('../__data__/supertest');
const config = require('../../src/lib/config');
const db = require('../../src/models');

const mockFindManyAdvicePrisma = jest.fn();
const mockCountAdvicePrisma = jest.fn();
const mockFindUniqueAdvicePrisma = jest.fn();
const mockFindManyDocumentPrisma = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		advice: {
			findMany: (query) => mockFindManyAdvicePrisma(query),
			count: (query) => mockCountAdvicePrisma(query),
			findUnique: (query) => mockFindUniqueAdvicePrisma(query)
		},
		document: {
			findMany: (query) => mockFindManyDocumentPrisma(query)
		}
	}
}));

jest.mock('../../src/models');

config.backOfficeIntegration.advice.getAdvice.caseReferences = [
	'BACKOFFICE-CASEID',
	'BACKOFFICE-CASEID-NOTFOUND'
];
describe('/api/v1/advice', () => {
	describe(' GET /api/v1/advice?caseRef={caseReference}', () => {
		beforeEach(() => {
			mockFindManyAdvicePrisma.mockResolvedValue(ADVICE_BACKOFFICE_DATA);
			mockCountAdvicePrisma.mockResolvedValue(1);
			db.Advice.findAndCountAll.mockResolvedValue({ rows: ADVICE_NI_DATA, count: 1 });
		});
		describe('when case reference is missing', () => {
			it('should return 400', async () => {
				const response = await request.get('/api/v1/advice');
				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: ['missing required parameter: caseRef']
				});
			});
		});
		describe('when an error is thrown', () => {
			it('should return 500', async () => {
				db.Advice.findAndCountAll.mockRejectedValue(new Error('MOCK ERROR'));
				const response = await request.get('/api/v1/advice?caseRef=NI-CASEID');

				expect(response.status).toEqual(500);
				expect(response.text).toEqual(
					'{"code":500,"message":{"errors":["Unexpected internal server error while handling API call"]}}'
				);
			});
		});
		describe('when the case reference is ni', () => {
			it('should return the correct data', async () => {
				const response = await request.get('/api/v1/advice?caseRef=NI-CASEID');

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					advice: ADVICE_NI_RESPONSE,
					totalItems: 1,
					itemsPerPage: 25,
					totalPages: 1,
					currentPage: 1
				});
			});
		});
		describe('when the case reference is backoffice', () => {
			it('should return the correct data', async () => {
				const response = await request.get('/api/v1/advice?caseRef=BACKOFFICE-CASEID');

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					advice: ADVICE_BACKOFFICE_RESPONSE,
					totalItems: 1,
					itemsPerPage: 25,
					totalPages: 1,
					currentPage: 1
				});
			});
		});
	});
	describe(' GET /api/v1/advice/{adviceID}?caseReference={caseReference}', () => {
		beforeEach(() => {
			mockFindUniqueAdvicePrisma.mockResolvedValue(ADVICE_BACKOFFICE_DATA[0]);
			mockFindManyDocumentPrisma.mockResolvedValue([
				{
					documentId: '123',
					mime: 'application/pdf',
					size: 123,
					documentURI: 'mock-uri'
				}
			]);
			db.Advice.findOne.mockResolvedValue(ADVICE_NI_DATA[0]);
			db.Attachment.findAllAttachmentsWithCase.mockResolvedValue([
				{
					dataValues: {
						documentDataID: '123',
						mime: 'application/pdf',
						size: 123,
						documentURI: 'mock-uri'
					}
				}
			]);
		});
		describe('when case reference is missing', () => {
			it('should return 400', async () => {
				const response = await request.get('/api/v1/advice/123');
				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: ['missing required parameter: caseReference']
				});
			});
		});
		describe('when an another error is thrown', () => {
			it('should return 500', async () => {
				mockFindUniqueAdvicePrisma.mockRejectedValue(new Error('MOCK ERROR'));
				const response = await request.get('/api/v1/advice/123?caseReference=BACKOFFICE-CASEID');

				expect(response.status).toEqual(500);
				expect(response.text).toEqual(
					'{"code":500,"message":{"errors":["Unexpected internal server error while handling API call"]}}'
				);
			});
		});
		describe('when the case reference is ni', () => {
			describe('and in the database', () => {
				it('should return the correct data', async () => {
					const response = await request.get('/api/v1/advice/123?caseReference=NI-CASEID');

					expect(response.status).toEqual(200);
					expect(response.body).toEqual({
						...ADVICE_NI_RESPONSE[0],
						attachments: [
							{
								documentDataID: '123',
								mime: 'application/pdf',
								size: 123,
								documentURI: `${config.documentsHost}mock-uri`
							}
						]
					});
				});
			});
			describe('and not in the database', () => {
				it('should return 404', async () => {
					db.Advice.findOne.mockResolvedValue(null);
					const response = await request.get('/api/v1/advice/123?caseReference=NI-CASEID');

					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['Advice with ID 123 not found']
					});
				});
			});
		});
		describe('when the case reference is backoffice', () => {
			describe('and in the database', () => {
				it('should return the correct data', async () => {
					const response = await request.get('/api/v1/advice/123?caseReference=BACKOFFICE-CASEID');

					expect(response.status).toEqual(200);
					expect(response.body).toEqual({
						...ADVICE_BACKOFFICE_RESPONSE[0],
						attachments: [
							{
								documentDataID: '123',
								mime: 'application/pdf',
								size: 123,
								documentURI: 'mock-uri'
							}
						]
					});
				});
			});
			describe('and not in the database', () => {
				it('should return 404', async () => {
					mockFindUniqueAdvicePrisma.mockResolvedValue(null);
					const response = await request.get('/api/v1/advice/123?caseReference=BACKOFFICE-CASEID');

					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['Advice with ID 123 not found']
					});
				});
			});
		});
	});
});
