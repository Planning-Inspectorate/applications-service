const { getRegisterIndexController } = require('./controller');

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

	describe('#getRegisterIndexController', () => {
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

			await getRegisterIndexController(req, res);

			expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
				activeId: 'register-index',
				closeDate: '2 January 2023',
				pageHeading: 'Register to have your say about a national infrastructure project',
				pageTitle:
					'Register to have your say about a national infrastructure project - National Infrastructure Planning',
				registeringForURL: '/projects/ABC123/register/who-registering-for',
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
			await getRegisterIndexController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
				activeId: 'register-index',
				closeDate: '2 January 2023',
				pageHeading: 'Register to have your say about a national infrastructure project',
				pageTitle:
					'Register to have your say about a national infrastructure project - National Infrastructure Planning',
				registeringForURL: '/projects/ABC123/register/who-registering-for',
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
			await getRegisterIndexController(req, res);
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
			await getRegisterIndexController(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});
		it('should redirect to not found route if registration period has closed and openRegistrationCaseReferences is empty', async () => {
			getAppData.mockImplementation(() =>
				Promise.resolve({
					resp_code: 200,
					data: {
						DateOfRepresentationPeriodOpen: '2022-04-01',
						DateOfRelevantRepresentationClose: '2022-07-01',
						openRegistrationCaseReferences: []
					}
				})
			);
			const req = {
				...mockReq()
			};
			await getRegisterIndexController(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});
	});
});
