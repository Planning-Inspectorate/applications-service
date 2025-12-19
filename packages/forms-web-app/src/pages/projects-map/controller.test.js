jest.mock('../../lib/logger', () => ({
	error: jest.fn(),
	info: jest.fn(),
	warn: jest.fn()
}));
jest.mock('./_utils/get-map-token');
jest.mock('../../services/applications.service');
jest.mock('../../config', () => ({
	featureFlag: {
		enableProjectsMapClustering: true,
		enableProjectsMapBoundaries: true,
		enableProjectsMapCustomIcons: true
	}
}));

const { getProjectsMapController } = require('./controller');
const { getMapAccessToken } = require('./_utils/get-map-token');
const { getApplications } = require('../../services/applications.service');

describe('pages/projects-map/controller', () => {
	let mockReq;
	let mockRes;
	let mockNext;

	beforeEach(() => {
		mockReq = {};
		mockRes = {
			render: jest.fn()
		};
		mockNext = jest.fn();

		getMapAccessToken.mockResolvedValue('test-token');
		getApplications.mockResolvedValue({
			applications: [
				{ caseReference: 'TR010001', projectName: 'Test Project', stage: 'Examination' }
			],
			filters: {},
			pagination: {}
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('#getProjectsMapController', () => {
		it('should render projects map page with applications and feature flags', async () => {
			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockRes.render).toHaveBeenCalledWith(
				'projects-map/view.njk',
				expect.objectContaining({
					title: 'Projects map',
					pageTitle: 'Projects map',
					mapAccessToken: 'test-token',
					applications: expect.any(Array),
					mapFeatureFlags: expect.objectContaining({
						enableClustering: true,
						enableBoundaries: true,
						enableCustomIcons: true
					})
				})
			);
		});

		it('should call next with error when token is null', async () => {
			getMapAccessToken.mockResolvedValue(null);

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
			expect(mockRes.render).not.toHaveBeenCalled();
		});

		it('should call next with error when getApplications fails', async () => {
			getApplications.mockRejectedValue(new Error('API Error'));

			await getProjectsMapController(mockReq, mockRes, mockNext);

			expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
		});
	});
});
