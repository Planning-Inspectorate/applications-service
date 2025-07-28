const { getRegisterIndexController } = require('./controller');

const { mockReq, mockRes } = require('../../../../../__tests__/unit/mocks');
const { mockI18n } = require('../../../_mocks/i18n');

const registerTranslation_EN = require('../_translations/en.json');
const registerTranslations = { register: registerTranslation_EN };
const i18n = mockI18n(registerTranslations);

jest.mock('../../../../lib/logger');

jest.mock('../../../../lib/application-api-wrapper');

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
			},
			i18n: i18n
		};
		res = {
			...mockRes(),
			locals: {
				applicationData: {
					DateOfRepresentationPeriodOpen: dateToday,
					DateOfRelevantRepresentationClose: null,
					DateOfReOpenRelevantRepresentationStart: null,
					DateOfReOpenRelevantRepresentationClose: null
				}
			}
		};
		responseWithStatus = mockRes();
		res.status.mockImplementation(() => responseWithStatus);
		jest.useFakeTimers().setSystemTime(new Date(dateToday));
	});

	describe('#getRegisterIndexController', () => {
		describe('Registration open dates', () => {
			describe('When the registration open period has not started', () => {
				beforeEach(async () => {
					res.locals.applicationData.DateOfRepresentationPeriodOpen = dateTomorrow;
					res.locals.applicationData.DateOfRelevantRepresentationClose = dateAfterTomorrow;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationStart = null;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationClose = null;

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
					res.locals.applicationData.DateOfRepresentationPeriodOpen = dateToday;
					res.locals.applicationData.DateOfRelevantRepresentationClose = dateTomorrow;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationStart = null;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationClose = null;

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
						caseRef: 'mock-case-ref',
						registerJourneyStarted: true
					});
				});
			});

			describe('When the registration open period has ended', () => {
				beforeEach(async () => {
					res.locals.applicationData.DateOfRepresentationPeriodOpen = dateBeforeYesterday;
					res.locals.applicationData.DateOfRelevantRepresentationClose = dateYesterday;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationStart = null;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationClose = null;

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
						caseRef: 'mock-case-ref',
						registerJourneyStarted: false
					});
				});
			});
		});

		describe('Registration re-opened dates', () => {
			describe('When the registration re-opened period has not started', () => {
				beforeEach(async () => {
					res.locals.applicationData.DateOfRepresentationPeriodOpen = dateBeforeYesterday;
					res.locals.applicationData.DateOfRelevantRepresentationClose = dateYesterday;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationStart = dateTomorrow;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationClose = dateAfterTomorrow;

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
						caseRef: 'mock-case-ref',
						registerJourneyStarted: false
					});
				});
			});

			describe('When the registration re-opened period has started', () => {
				beforeEach(async () => {
					res.locals.applicationData.DateOfRepresentationPeriodOpen = dateBeforeYesterday;
					res.locals.applicationData.DateOfRelevantRepresentationClose = dateYesterday;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationStart = dateToday;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationClose = dateTomorrow;

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
						caseRef: 'mock-case-ref',
						registerJourneyStarted: true
					});
				});
			});

			describe('When the registration re-opened period has ended', () => {
				beforeEach(async () => {
					res.locals.applicationData.DateOfRepresentationPeriodOpen = dateBeforeYesterday;
					res.locals.applicationData.DateOfRelevantRepresentationClose = dateYesterday;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationStart = dateBeforeYesterday;
					res.locals.applicationData.DateOfReOpenRelevantRepresentationClose = dateYesterday;

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
						caseRef: 'mock-case-ref',
						registerJourneyStarted: false
					});
				});
			});
		});

		describe('When there is an issue', () => {
			beforeEach(async () => {
				res.locals = null;
				await getRegisterIndexController(req, res);
			});

			it('should display the page not found screen', () => {
				expect(res.status).toHaveBeenCalledWith(404);
				expect(responseWithStatus.render).toHaveBeenCalledWith('error/not-found');
				expect(req.session).toEqual({
					comment: 'mock session comment',
					typeOfParty: 'mock session type of party'
				});
			});
		});
	});
});
