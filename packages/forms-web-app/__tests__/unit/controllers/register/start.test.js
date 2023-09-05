const startController = require('../../../../src/controllers/register/start');
const { getAppData } = require('../../../../src/services/applications.service');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

jest.mock('../../../../src/services/applications.service');

describe('controllers/register/start', () => {
	let res;
	let responseWithStatus;

	beforeEach(() => {
		jest.resetAllMocks();
		res = mockRes();
		responseWithStatus = mockRes();
		res.status.mockImplementation(() => responseWithStatus);
	});

	describe('getStart', () => {
		it('should load project data and return register start view', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						ProjectName: 'St James Barton Giant Wind Turbine',
						DateOfRelevantRepresentationClose: '2024-09-01'
					}
				})
			);
			const req = {
				...mockReq(),
				params: {
					case_ref: 'ABC123'
				}
			};
			await startController.getStart(req, res);
			expect(res.render).toHaveBeenCalledWith('register/start', {
				projectName: 'St James Barton Giant Wind Turbine',
				periodOpen: true,
				closeDate: '1 September 2024',
				baseUrl: '/projects/ABC123'
			});
		});
		it('should load project data and return register start view even when existing project in session  ', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						ProjectName: 'St James Barton Giant Wind Turbine',
						DateOfRelevantRepresentationClose: '2024-09-01'
					}
				})
			);
			const req = {
				...mockReq(),
				params: {
					case_ref: 'ABC123'
				},
				session: {
					caseRef: 'ABC120',
					projectName: 'Giant Solar Farm',
					appData: {
						DateOfRelevantRepresentationClose: '2024-01-20'
					}
				}
			};
			await startController.getStart(req, res);
			expect(res.render).toHaveBeenCalledWith('register/start', {
				projectName: 'St James Barton Giant Wind Turbine',
				periodOpen: true,
				closeDate: '1 September 2024',
				baseUrl: '/projects/ABC123'
			});
		});
		it('should redirect to not found route if project not found for caseRef provided', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 404
				})
			);
			const req = {
				...mockReq(),
				params: {
					case_ref: 'ABC100'
				}
			};
			await startController.getStart(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});
		it('should redirect to not found route if caseRef not provided', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 404
				})
			);
			const req = {
				...mockReq(),
				session: {}
			};
			await startController.getStart(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});
	});
});
