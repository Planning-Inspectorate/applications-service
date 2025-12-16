const { getProjectsMapController } = require('./controller');
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
		it('should render projects map with token', async () => {
			getMapAccessToken.mockResolvedValue('mock-token');

			await getProjectsMapController(req, res, next);

			expect(getMapAccessToken).toHaveBeenCalled();
			expect(res.render).toHaveBeenCalledWith('projects-map/view.njk', {
				mapAccessToken: 'mock-token'
			});
			expect(next).not.toHaveBeenCalled();
		});

		it('should call next with error when token is null', async () => {
			getMapAccessToken.mockResolvedValue(null);

			await getProjectsMapController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(res.render).not.toHaveBeenCalled();
		});

		it('should call next with error when getMapAccessToken throws', async () => {
			getMapAccessToken.mockRejectedValue(new Error('Token error'));

			await getProjectsMapController(req, res, next);

			expect(next).toHaveBeenCalledWith(expect.any(Error));
			expect(res.render).not.toHaveBeenCalled();
		});
	});
});
