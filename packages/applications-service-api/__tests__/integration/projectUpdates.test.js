const { request } = require('../__data__/supertest');
const { PROJECT_UPDATE_DB, PROJECT_UPDATE_RESPONSE } = require('../__data__/projectUpdates');

const mockProjectUpdateFindMany = jest.fn();
const mockProjectFindUnique = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		projectUpdate: {
			findMany: (query) => mockProjectUpdateFindMany(query)
		},
		project: {
			findUnique: (query) => mockProjectFindUnique(query)
		}
	}
}));

describe('/api/v1/project-updates/{{caseReference}}', () => {
	it('returns project updates when case has some', async () => {
		mockProjectFindUnique.mockResolvedValueOnce({ id: 1 });
		mockProjectUpdateFindMany.mockResolvedValueOnce([PROJECT_UPDATE_DB]);

		const response = await request.get('/api/v1/project-updates/BC0110001');

		expect(response.status).toEqual(200);
		expect(response.body).toEqual({ updates: [PROJECT_UPDATE_RESPONSE] });
	});

	it('returns no project updates when case has none', async () => {
		mockProjectFindUnique.mockResolvedValueOnce({ id: 1 });
		mockProjectUpdateFindMany.mockResolvedValueOnce([]);

		const response = await request.get('/api/v1/project-updates/BC0110001');

		expect(response.status).toEqual(200);
		expect(response.body).toEqual({ updates: [] });
	});

	it('returns 400 when caseReference in invalid format', async () => {
		const response = await request.get('/api/v1/project-updates/AAAAAAAAA');

		expect(response.status).toEqual(400);
	});

	it('returns 404 when case not found', async () => {
		mockProjectFindUnique.mockResolvedValueOnce(null);

		const response = await request.get('/api/v1/project-updates/BC0110001');

		expect(response.status).toEqual(404);
	});

	it('returns 500 when unhandled error occurs', async () => {
		mockProjectFindUnique.mockRejectedValueOnce(new Error('some error'));

		const response = await request.get('/api/v1/project-updates/BC0110001');

		expect(response.status).toEqual(500);
	});
});
