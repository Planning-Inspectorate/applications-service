const {
	TIMETABLES_NI_RESPONSE,
	TIMETABLES_NI_DATA,
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA
} = require('../__data__/timetables');
const { request } = require('../__data__/supertest');
const config = require('../../src/lib/config');
const { isBackOfficeCaseReference } = require('../../src/utils/is-backoffice-case-reference');
const db = require('../../src/models');

const mockFindManyPrisma = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		examinationTimetable: {
			findMany: (query) => mockFindManyPrisma(query)
		}
	}
}));
jest.mock('../../src/utils/is-backoffice-case-reference');
jest.mock('../../src/models');

isBackOfficeCaseReference.mockImplementation((caseReference) =>
	caseReference.startsWith('BACKOFFICE')
);
config.timetableItemsPerPage = 100;

describe('/api/v1/timetable', () => {
	describe(' GET /api/v1/timetables/ {caseReference}', () => {
		describe('when the case reference contains some script', () => {
			it('should sanitize the case reference', async () => {
				const response = await request.get(
					`/api/v1/timetables/${encodeURIComponent('<script>ABCDEF</script>')}`
				);

				expect(response.status).toEqual(400);
				expect(response.body).toEqual({
					code: 400,
					errors: ['Invalid caseReference']
				});
			});
		});
		describe('when the case reference is ni', () => {
			describe('and it exists in the ni database', () => {
				it('should return the correct data', async () => {
					db.Timetable.findAll.mockResolvedValue(TIMETABLES_NI_DATA);
					const response = await request.get('/api/v1/timetables/NI-CASEID');

					expect(response.status).toEqual(200);
					expect(response.body).toEqual({
						timetables: TIMETABLES_NI_RESPONSE,
						totalItems: 2,
						itemsPerPage: 100,
						totalPages: 1,
						currentPage: 1
					});
				});
			});
			describe('and it does not exist in the ni database', () => {
				it('should return 404', async () => {
					db.Timetable.findAll.mockResolvedValue([]);
					const response = await request.get('/api/v1/timetables/NI-CASEID-NOTFOUND');

					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['No documents found']
					});
				});
			});
		});
		describe('when the case reference is backoffice', () => {
			describe('and it exists in the backoffice database', () => {
				it('should return the correct data', async () => {
					mockFindManyPrisma.mockResolvedValue(TIMETABLES_BACKOFFICE_DATA);
					const response = await request.get('/api/v1/timetables/BACKOFFICE-CASEID');

					expect(response.status).toEqual(200);
					expect(response.body).toEqual({
						timetables: TIMETABLES_BACKOFFICE_RESPONSE,
						totalItems: 2,
						itemsPerPage: 100,
						totalPages: 1,
						currentPage: 1
					});
				});
			});
			describe('and it does not exist in the backoffice database', () => {
				it('should return 404', async () => {
					mockFindManyPrisma.mockResolvedValue([]);
					const response = await request.get('/api/v1/timetables/BACKOFFICE-CASEID-NOTFOUND');

					expect(response.status).toEqual(404);
					expect(response.body).toEqual({
						code: 404,
						errors: ['No documents found']
					});
				});
			});
		});
		describe('when an error is thrown', () => {
			it('should return 500', async () => {
				db.Timetable.findAll.mockRejectedValue(new Error('MOCK ERROR'));
				const response = await request.get('/api/v1/timetables/NI-CASEID');

				expect(response.status).toEqual(500);
				expect(response.text).toEqual(
					'Problem getting timetables for project NI-CASEID \n Error: MOCK ERROR'
				);
			});
		});
	});
});
