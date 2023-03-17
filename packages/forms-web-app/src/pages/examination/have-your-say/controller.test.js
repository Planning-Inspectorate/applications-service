const { getHaveYourSay } = require('./controller');
const { mockReq, mockRes } = require('../../../../__tests__/unit/mocks');

jest.mock('../../../lib/logger');

jest.mock('../../../services/application.service');

describe('controllers/register/start', () => {
	let res;
	let responseWithStatus;

	beforeEach(() => {
		jest.resetAllMocks();
		res = mockRes();
		responseWithStatus = mockRes();
		res.status.mockImplementation(() => responseWithStatus);
	});

	describe('Have Your Say', () => {
		it('should load project data and return register have your say view', async () => {
			const req = {
				...mockReq(),
				session: {
					examination: {
						caseRef: 'ABC123'
					}
				}
			};
			await getHaveYourSay(req, res);
			expect(res.render).toHaveBeenCalledWith('examination/have-your-say/view.njk', {
				backLinkUrl: '/projects/ABC123/examination-timetable',
				pageTitle: 'Have your say during the Examination of the application',
				startNowUrl: '/examination/have-an-interested-party-number',
				title: 'Have your say during the Examination of the application'
			});
		});

		it('should load project data and return have your say view even when existing project in session  ', async () => {
			const req = {
				...mockReq(),
				session: {
					examination: {
						caseRef: 'ABC120'
					}
				}
			};
			await getHaveYourSay(req, res);
			expect(res.render).toHaveBeenCalledWith('examination/have-your-say/view.njk', {
				backLinkUrl: '/projects/ABC120/examination-timetable',
				pageTitle: 'Have your say during the Examination of the application',
				startNowUrl: '/examination/have-an-interested-party-number',
				title: 'Have your say during the Examination of the application'
			});
		});

		it('should redirect to not found route if project not found for caseRef provided', async () => {
			const req = {
				...mockReq(),
				params: {
					case_ref: 'ABC100'
				}
			};
			await getHaveYourSay(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});

		it('should redirect to not found route if caseRef not provided', async () => {
			const req = {
				...mockReq(),
				session: {}
			};
			await getHaveYourSay(req, res);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
		});
	});
});
