const { getRegister } = require('./controller');

const { getAppData } = require('../../../../services/applications.service');
const { mockReq, mockRes } = require('../../../../../__tests__/unit/mocks');

jest.mock('../../../../lib/logger');

jest.mock('../../../../services/applications.service');

describe('projects/register/index/controller', () => {
	let res;
	let responseWithStatus;

	beforeEach(() => {
		jest.resetAllMocks();
		res = mockRes();
		responseWithStatus = mockRes();
		res.status.mockImplementation(() => responseWithStatus);
		jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
	});

	describe('#getRegister', () => {
		it('should load project data and return register start view', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						ProjectName: 'St James Barton Giant Wind Turbine',
						DateOfRelevantRepresentationClose: '2023-01-02'
					}
				})
			);

			const req = {
				...mockReq(),
				params: {
					case_ref: 'ABC123'
				}
			};

			await getRegister(req, res);

			expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
				activeId: 'register-index',
				closeDate: '2 January 2023',
				headerTitle: 'Register to have your say about a national infrastructure project',
				pageHeading: 'Register to have your say about a national infrastructure project',
				pageTitle:
					'Register to have your say about a national infrastructure project - National Infrastructure Planning',
				periodOpen: true
			});
		});
		it('should load project data and return register start view even when existing project in session  ', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						ProjectName: 'St James Barton Giant Wind Turbine',
						DateOfRelevantRepresentationClose: '2023-01-02'
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
			await getRegister(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
				activeId: 'register-index',
				closeDate: '2 January 2023',
				headerTitle: 'Register to have your say about a national infrastructure project',
				pageHeading: 'Register to have your say about a national infrastructure project',
				pageTitle:
					'Register to have your say about a national infrastructure project - National Infrastructure Planning',
				periodOpen: true
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
			await getRegister(req, res);
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
			await getRegister(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});
	});
});
