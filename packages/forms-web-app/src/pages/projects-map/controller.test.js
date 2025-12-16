const { getProjectsMapController, getProjectsMapFullscreenController } = require('./controller');
const { getMapAccessToken } = require('./_utils/get-map-token');

jest.mock('./_utils/get-map-token');
jest.mock('../../lib/logger');

describe('projects-map controller', () => {
	let req, res, next;

	beforeEach(() => {
		req = {};
		res = {
			render: jest.fn()
		};
		next = jest.fn();
		jest.clearAllMocks();
	});

	describe('getProjectsMapController', () => {
		it('should render projects map with token and isFullscreen false', async () => {
			getMapAccessToken.mockResolvedValue('mock-token');

			await getProjectsMapController(req, res, next);

			expect(getMapAccessToken).toHaveBeenCalled();
			expect(res.render).toHaveBeenCalledWith('projects-map/view.njk', {
				mapAccessToken: 'mock-token',
				isFullscreen: false
			});
			expect(next).not.toHaveBeenCalled();
		});

		it('should call next with error when token retrieval fails', async () => {
			getMapAccessToken.mockResolvedValue(null);

			await getProjectsMapController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(res.render).not.toHaveBeenCalled();
		});
	});

	describe('getProjectsMapFullscreenController', () => {
		it('should render projects map with token and isFullscreen true', async () => {
			getMapAccessToken.mockResolvedValue('mock-token');

			await getProjectsMapFullscreenController(req, res, next);

			expect(getMapAccessToken).toHaveBeenCalled();
			expect(res.render).toHaveBeenCalledWith('projects-map/view.njk', {
				mapAccessToken: 'mock-token',
				isFullscreen: true
			});
			expect(next).not.toHaveBeenCalled();
		});

		it('should call next with error when getMapAccessToken throws', async () => {
			getMapAccessToken.mockRejectedValue(new Error('Token error'));

			await getProjectsMapFullscreenController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(res.render).not.toHaveBeenCalled();
		});
	});
});
