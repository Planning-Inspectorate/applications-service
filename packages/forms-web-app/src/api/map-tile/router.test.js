const supertest = require('supertest');
const express = require('express');
const { mapTileRouter } = require('./router');
const { getMapAccessToken } = require('../_services/os-maps-token.service');
const fetch = require('node-fetch');

jest.mock('../_services/os-maps-token.service');
jest.mock('node-fetch');
jest.mock('../../lib/logger');

describe('api/map-tile/router', () => {
	let app;
	let request;

	beforeEach(() => {
		app = express();
		app.use('/api/map-tile', mapTileRouter);
		request = supertest(app);
		jest.clearAllMocks();
	});

	it('should serve tiles successfully with authentication', async () => {
		getMapAccessToken.mockResolvedValue('mock-token');
		fetch.mockResolvedValue({
			ok: true,
			status: 200,
			arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('PNG data'))
		});

		const response = await request.get('/api/map-tile/7/64/43');

		expect(response.status).toBe(200);
		expect(response.headers['content-type']).toBe('image/png');
		expect(getMapAccessToken).toHaveBeenCalled();
		expect(fetch).toHaveBeenCalledWith(
			'https://api.os.uk/maps/raster/v1/zxy/Light_3857/7/64/43.png',
			expect.objectContaining({
				headers: { Authorization: 'Bearer mock-token' }
			})
		);
	});

	test.each([
		['abc', '64', '43'],
		['7', 'abc', '43'],
		['7', '64', 'abc']
	])('should reject invalid coordinates: %s/%s/%s', async (z, x, y) => {
		const response = await request.get(`/api/map-tile/${z}/${x}/${y}`);
		expect(response.status).toBe(400);
	});

	it('should handle authentication failures', async () => {
		getMapAccessToken.mockResolvedValue(null);

		const response = await request.get('/api/map-tile/1/1/1');

		expect(response.status).toBe(500);
	});

	it('should handle OS API errors', async () => {
		getMapAccessToken.mockResolvedValue('mock-token');
		fetch.mockResolvedValue({
			ok: false,
			status: 404,
			text: jest.fn().mockResolvedValue('Not found')
		});

		const response = await request.get('/api/map-tile/10/10/10');

		expect(response.status).toBe(404);
	});

	it('should cache tile requests', async () => {
		getMapAccessToken.mockResolvedValue('mock-token');
		fetch.mockResolvedValue({
			ok: true,
			status: 200,
			arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('PNG'))
		});

		await request.get('/api/map-tile/5/16/16');
		const firstCallCount = fetch.mock.calls.length;

		await request.get('/api/map-tile/5/16/16');

		expect(fetch.mock.calls.length).toBe(firstCallCount);
	});
});
