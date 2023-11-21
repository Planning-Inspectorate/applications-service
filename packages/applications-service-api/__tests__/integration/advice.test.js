const {
	ADVICE_BACKOFFICE_RESPONSE,
	ADVICE_BACKOFFICE_DATA,
	ADVICE_NI_RESPONSE,
	ADVICE_NI_DATA
} = require('../__data__/advice');
const { request } = require('../__data__/supertest');
const config = require('../../src/lib/config');
const db = require('../../src/models');

const mockFindManyPrisma = jest.fn();
const mockCountPrisma = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		advice: {
			findMany: (query) => mockFindManyPrisma(query),
			count: (query) => mockCountPrisma(query)
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
			mockFindManyPrisma.mockResolvedValue(ADVICE_BACKOFFICE_DATA);
			mockCountPrisma.mockResolvedValue(1);
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
				expect(response.text).toEqual('{"message":"Problem getting advice \\n Error: MOCK ERROR"}');
			});
		});
		describe('when the case reference is ni', () => {
			describe('and it exists in the ni database', () => {
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
			describe('and it does not exist in the ni database', () => {
				it('should return 404', async () => {
					db.Advice.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });
					const response = await request.get('/api/v1/advice?caseRef=NI-CASEID-NOTFOUND');

					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: [`Advice with ID NI-CASEID-NOTFOUND not found`]
					});
				});
			});
		});
		describe('when the case reference is backoffice', () => {
			describe('and it exists in the backoffice database', () => {
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
			describe('and it does not exist in the backoffice database', () => {
				it('should return 404', async () => {
					mockFindManyPrisma.mockResolvedValue([]);
					mockCountPrisma.mockResolvedValue(0);
					const response = await request.get('/api/v1/advice?caseRef=BACKOFFICE-CASEID-NOTFOUND');

					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: [`Advice with ID BACKOFFICE-CASEID-NOTFOUND not found`]
					});
				});
			});
		});
	});
});
