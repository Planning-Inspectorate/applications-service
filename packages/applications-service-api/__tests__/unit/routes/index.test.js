const { request } = require('../../__data__/supertest');

describe('routes/index', () => {
	it('should return 204 status code on GET root path', async () => {
		const res = await request.get('/');
		expect(res.status).toBe(204);
	});
});
