const { getRegisterIndexController } = require('./controller');

const { getAppData } = require('../../../../services/applications.service');
const { mockReq, mockRes } = require('../../../../../__tests__/unit/mocks');

jest.mock('../../../../lib/logger');

jest.mock('../../../../services/applications.service');

describe('projects/register/index/controller', () => {
	const dateBeforeYesterday = '2023-01-01';
	const dateYesterday = '2023-01-02';
	const dateToday = '2023-01-03';
	const dateTomorrow = '2023-01-04';
	const dateAfterTomorrow = '2023-01-05';

	let req;
	let res;
	let responseWithStatus;

	beforeEach(() => {
		jest.resetAllMocks();

		req = {
			...mockReq(),
			session: {
				comment: 'mock session comment',
				typeOfParty: 'mock session type of party'
			},
			params: {
				case_ref: 'mock-case-ref'
			}
		};
		res = mockRes();
		responseWithStatus = mockRes();
		res.status.mockImplementation(() => responseWithStatus);
		jest.useFakeTimers().setSystemTime(new Date(dateToday));
	});

	describe('#getRegisterIndexController', () => {
		describe('When there is an issue', () => {
			beforeEach(async () => {
				getAppData.mockImplementation(() =>
					Promise.resolve({
						resp_code: 404
					})
				);
				await getRegisterIndexController(req, res);
			});
			it('should display the page not found screen', () => {
				expect(res.status).toHaveBeenCalledWith(404);
				expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
				expect(req.session).toEqual({});
			});
		});
		describe('Registration open dates', () => {
			describe('When the registration open period has not started', () => {
				beforeEach(async () => {
					getAppData.mockImplementation(() =>
						Promise.resolve({
							resp_code: 200,
							data: {
								ProjectName: 'mock project name',
								DateOfRepresentationPeriodOpen: dateTomorrow,
								DateOfRelevantRepresentationClose: dateAfterTomorrow,
								DateOfReOpenRelevantRepresentationStart: null,
								DateOfReOpenRelevantRepresentationClose: null
							}
						})
					);
					await getRegisterIndexController(req, res);
				});
				it('should display the page not found screen', () => {
					expect(res.status).toHaveBeenCalledWith(404);
					expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
					expect(req.session).toEqual({});
				});
			});
			describe('When the registration open period has started', () => {
				beforeEach(async () => {
					getAppData.mockImplementation(() =>
						Promise.resolve({
							resp_code: 200,
							data: {
								ProjectName: 'mock project name',
								DateOfRepresentationPeriodOpen: dateToday,
								DateOfRelevantRepresentationClose: dateTomorrow,
								DateOfReOpenRelevantRepresentationStart: null,
								DateOfReOpenRelevantRepresentationClose: null
							}
						})
					);
					await getRegisterIndexController(req, res);
				});
				it('should render the registration page with the correct data and set the correct session data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
						activeId: 'register-index',
						closeDate: '4 January 2023',
						pageHeading: 'Register to have your say about a national infrastructure project',
						pageTitle:
							'Register to have your say about a national infrastructure project - National Infrastructure Planning',
						registeringForURL: '/projects/mock-case-ref/register/who-registering-for',
						registrationOpen: true,
						registrationReOpened: false
					});
					expect(req.session).toEqual({
						appData: {
							DateOfReOpenRelevantRepresentationClose: null,
							DateOfReOpenRelevantRepresentationStart: null,
							DateOfRelevantRepresentationClose: '2023-01-04',
							DateOfRepresentationPeriodOpen: '2023-01-03',
							ProjectName: 'mock project name'
						},
						caseRef: 'mock-case-ref',
						projectName: 'mock project name',
						registerJourneyStarted: true
					});
				});
			});
			describe('When the registration open period has ended', () => {
				beforeEach(async () => {
					getAppData.mockImplementation(() =>
						Promise.resolve({
							resp_code: 200,
							data: {
								ProjectName: 'mock project name',
								DateOfRepresentationPeriodOpen: dateBeforeYesterday,
								DateOfRelevantRepresentationClose: dateYesterday,
								DateOfReOpenRelevantRepresentationStart: null,
								DateOfReOpenRelevantRepresentationClose: null
							}
						})
					);
					await getRegisterIndexController(req, res);
				});
				it('should render the registration page with the correct data and set the correct session data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
						activeId: 'register-index',
						closeDate: false,
						pageHeading: 'Register to have your say about a national infrastructure project',
						pageTitle:
							'Register to have your say about a national infrastructure project - National Infrastructure Planning',
						registeringForURL: '/projects/mock-case-ref/register/who-registering-for',
						registrationOpen: false,
						registrationReOpened: false
					});
					expect(req.session).toEqual({
						appData: {
							DateOfReOpenRelevantRepresentationClose: null,
							DateOfReOpenRelevantRepresentationStart: null,
							DateOfRelevantRepresentationClose: '2023-01-02',
							DateOfRepresentationPeriodOpen: '2023-01-01',
							ProjectName: 'mock project name'
						},
						caseRef: 'mock-case-ref',
						projectName: 'mock project name',
						registerJourneyStarted: false
					});
				});
			});
		});

		describe('Registration re-opened dates', () => {
			describe('When the registration re-opened period has not started', () => {
				beforeEach(async () => {
					getAppData.mockImplementation(() =>
						Promise.resolve({
							resp_code: 200,
							data: {
								ProjectName: 'mock project name',
								DateOfRepresentationPeriodOpen: dateBeforeYesterday,
								DateOfRelevantRepresentationClose: dateYesterday,
								DateOfReOpenRelevantRepresentationStart: dateTomorrow,
								DateOfReOpenRelevantRepresentationClose: dateAfterTomorrow
							}
						})
					);
					await getRegisterIndexController(req, res);
				});
				it('should render the registration page with the correct data and set the correct session data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
						activeId: 'register-index',
						closeDate: false,
						pageHeading: 'Register to have your say about a national infrastructure project',
						pageTitle:
							'Register to have your say about a national infrastructure project - National Infrastructure Planning',
						registeringForURL: '/projects/mock-case-ref/register/who-registering-for',
						registrationOpen: false,
						registrationReOpened: false
					});
					expect(req.session).toEqual({
						appData: {
							DateOfReOpenRelevantRepresentationClose: '2023-01-05',
							DateOfReOpenRelevantRepresentationStart: '2023-01-04',
							DateOfRelevantRepresentationClose: '2023-01-02',
							DateOfRepresentationPeriodOpen: '2023-01-01',
							ProjectName: 'mock project name'
						},
						caseRef: 'mock-case-ref',
						projectName: 'mock project name',
						registerJourneyStarted: false
					});
				});
			});

			describe('When the registration re-opened period has started', () => {
				beforeEach(async () => {
					getAppData.mockImplementation(() =>
						Promise.resolve({
							resp_code: 200,
							data: {
								ProjectName: 'mock project name',
								DateOfRepresentationPeriodOpen: dateBeforeYesterday,
								DateOfRelevantRepresentationClose: dateYesterday,
								DateOfReOpenRelevantRepresentationStart: dateToday,
								DateOfReOpenRelevantRepresentationClose: dateTomorrow
							}
						})
					);
					await getRegisterIndexController(req, res);
				});
				it('should render the registration page with the correct data and set the correct session data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
						activeId: 'register-index',
						closeDate: '4 January 2023',
						pageHeading: 'Register to have your say about a national infrastructure project',
						pageTitle:
							'Register to have your say about a national infrastructure project - National Infrastructure Planning',
						registeringForURL: '/projects/mock-case-ref/register/who-registering-for',
						registrationOpen: false,
						registrationReOpened: true
					});
					expect(req.session).toEqual({
						appData: {
							DateOfReOpenRelevantRepresentationClose: '2023-01-04',
							DateOfReOpenRelevantRepresentationStart: '2023-01-03',
							DateOfRelevantRepresentationClose: '2023-01-02',
							DateOfRepresentationPeriodOpen: '2023-01-01',
							ProjectName: 'mock project name'
						},
						caseRef: 'mock-case-ref',
						projectName: 'mock project name',
						registerJourneyStarted: true
					});
				});
			});

			describe('When the registration re-opened period has ended', () => {
				beforeEach(async () => {
					getAppData.mockImplementation(() =>
						Promise.resolve({
							resp_code: 200,
							data: {
								ProjectName: 'mock project name',
								DateOfRepresentationPeriodOpen: dateBeforeYesterday,
								DateOfRelevantRepresentationClose: dateYesterday,
								DateOfReOpenRelevantRepresentationStart: dateBeforeYesterday,
								DateOfReOpenRelevantRepresentationClose: dateYesterday
							}
						})
					);
					await getRegisterIndexController(req, res);
				});
				it('should render the registration page with the correct data and set the correct session data', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/index/view.njk', {
						activeId: 'register-index',
						closeDate: false,
						pageHeading: 'Register to have your say about a national infrastructure project',
						pageTitle:
							'Register to have your say about a national infrastructure project - National Infrastructure Planning',
						registeringForURL: '/projects/mock-case-ref/register/who-registering-for',
						registrationOpen: false,
						registrationReOpened: false
					});
					expect(req.session).toEqual({
						appData: {
							DateOfReOpenRelevantRepresentationClose: '2023-01-02',
							DateOfReOpenRelevantRepresentationStart: '2023-01-01',
							DateOfRelevantRepresentationClose: '2023-01-02',
							DateOfRepresentationPeriodOpen: '2023-01-01',
							ProjectName: 'mock project name'
						},
						caseRef: 'mock-case-ref',
						projectName: 'mock project name',
						registerJourneyStarted: false
					});
				});
			});
		});
	});
});
