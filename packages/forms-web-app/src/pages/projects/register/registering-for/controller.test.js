const { getRegisteringForController, postRegisteringForController } = require('./controller');

const { mockReq, mockRes } = require('../../../../../__tests__/unit/mocks');

describe('pages/projects/register/registering-for/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			params: {
				case_ref: 'mock-case-ref'
			},
			query: {},
			session: {}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('#getRegisteringForController', () => {
		beforeEach(() => {
			req.session.typeOfParty = 'myself';
			getRegisteringForController(req, res);
		});
		it('should call the correct template', () => {
			expect(res.render).toHaveBeenCalledWith('projects/register/registering-for/view.njk', {
				type: 'myself'
			});
		});
	});

	describe('#postRegisteringForController', () => {
		describe('And there is an issue', () => {
			it('should re-render the template with errors if there is any validation error', async () => {
				const mockRequest = {
					...req,
					body: {
						'type-of-party': null,
						errors: { a: 'b' },
						errorSummary: [{ text: 'There were errors here', href: '#' }]
					}
				};
				await postRegisteringForController(mockRequest, res);

				expect(res.redirect).not.toHaveBeenCalled();

				expect(res.render).toHaveBeenCalledWith('projects/register/registering-for/view.njk', {
					type: null,
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				});
			});
		});

		describe('And there are no issues', () => {
			describe(`When the user has selected 'Myself' - myself`, () => {
				beforeEach(() => {
					req = {
						...req,
						body: {
							'type-of-party': 'myself'
						}
					};

					postRegisteringForController(req, res);
				});

				it('should set the correct session data and redirect to the correct page', () => {
					expect(req.session).toEqual({
						mySelfRegdata: {
							address: { country: null, line1: null, line2: null, line3: null, postcode: null },
							behalf: 'me',
							case_ref: null,
							email: null,
							'full-name': null,
							'over-18': null,
							telephone: null
						},
						typeOfParty: 'myself'
					});

					expect(res.redirect).toHaveBeenCalledWith(
						'/projects/mock-case-ref/register/myself/full-name'
					);
				});
			});

			describe(`When the user has selected 'An organisation I work or volunteer for' - organisation`, () => {
				beforeEach(() => {
					req = {
						...req,
						body: {
							'type-of-party': 'organisation'
						}
					};

					postRegisteringForController(req, res);
				});

				it('should set the correct session data and redirect to the correct page', () => {
					expect(req.session).toEqual({
						orgRegdata: {
							address: { country: null, line1: null, line2: null, line3: null, postcode: null },
							behalf: 'them',
							case_ref: null,
							email: null,
							'full-name': null,
							'organisation-name': null,
							'over-18': null,
							role: null,
							telephone: null
						},
						typeOfParty: 'organisation'
					});

					expect(res.redirect).toHaveBeenCalledWith(
						'/projects/mock-case-ref/register/organisation/full-name'
					);
				});
			});

			describe(`When the user has selected 'On behalf of another person, a family group or an organisation I do not work for' - behalf`, () => {
				beforeEach(() => {
					req = {
						...req,
						body: {
							'type-of-party': 'behalf'
						}
					};

					postRegisteringForController(req, res);
				});

				it('should set the correct session data and redirect to the correct page', () => {
					expect(req.session).toEqual({
						behalfRegdata: {
							behalf: 'you',
							case_ref: null,
							representee: {
								address: { country: null, line1: null, line2: null, line3: null, postcode: null },
								email: null,
								'full-name': null,
								'over-18': null,
								telephone: null
							},
							representing: null,
							representor: {
								address: { country: null, line1: null, line2: null, line3: null, postcode: null },
								email: null,
								'full-name': null,
								'organisation-name': null,
								'over-18': null,
								telephone: null
							}
						},
						typeOfParty: 'behalf'
					});

					expect(res.redirect).toHaveBeenCalledWith(
						'/projects/mock-case-ref/register/agent/full-name'
					);
				});
			});

			describe('And the user is editing their previously selected option', () => {
				beforeEach(() => {
					req = {
						...req,
						query: {
							mode: 'edit'
						},
						session: {
							typeOfParty: 'myself'
						}
					};
				});

				describe('and the user does not select a new option', () => {
					beforeEach(() => {
						req = {
							...req,
							body: {
								'type-of-party': 'myself'
							}
						};

						postRegisteringForController(req, res);
					});

					it('should not set any new session data and should redirect to the correct page', () => {
						expect(req.session).toEqual({ typeOfParty: 'myself' });

						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/myself/check-answers'
						);
					});
				});
				describe('and the user selects a new option', () => {
					beforeEach(() => {
						req = {
							...req,
							body: {
								'type-of-party': 'organisation'
							}
						};

						postRegisteringForController(req, res);
					});
					it('should set the correct session data and redirect to the correct page', () => {
						expect(req.session).toEqual({
							orgRegdata: {
								address: { country: null, line1: null, line2: null, line3: null, postcode: null },
								behalf: 'them',
								case_ref: null,
								email: null,
								'full-name': null,
								'organisation-name': null,
								'over-18': null,
								role: null,
								telephone: null
							},
							typeOfParty: 'organisation'
						});

						expect(res.redirect).toHaveBeenCalledWith(
							'/projects/mock-case-ref/register/organisation/full-name'
						);
					});
				});
			});
		});
	});
});
