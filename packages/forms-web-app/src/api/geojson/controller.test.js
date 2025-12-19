jest.mock('node-fetch');
jest.mock('../../lib/logger', () => ({
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn()
}));
jest.mock('../../config', () => ({
	maps: {
		geojsonURL: 'https://example.com/geojson'
	}
}));

const fetch = require('node-fetch');
const { getGeoJsonController } = require('./controller');

describe('api/geojson/controller', () => {
	let mockReq;
	let mockRes;
	let mockNext;

	beforeEach(() => {
		mockReq = {};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			setHeader: jest.fn()
		};
		mockNext = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('#getGeoJsonController', () => {
		it('should pipe geojson response on success', async () => {
			const mockBody = {
				pipe: jest.fn()
			};
			fetch.mockResolvedValue({
				ok: true,
				body: mockBody
			});

			await getGeoJsonController(mockReq, mockRes, mockNext);

			expect(fetch).toHaveBeenCalledWith('https://example.com/geojson');
			expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
			expect(mockBody.pipe).toHaveBeenCalledWith(mockRes);
		});

		it('should call next with error when fetch fails', async () => {
			fetch.mockResolvedValue({
				ok: false,
				status: 500,
				statusText: 'Internal Server Error'
			});

			await getGeoJsonController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});
	});
});
