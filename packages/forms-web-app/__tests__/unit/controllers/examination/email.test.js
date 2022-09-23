const { getEmail, postEmail } = require('../../../../src/controllers/examination/email');
const { mockReq, mockRes, mockResponse } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

const pageData = {
	backLinkUrl: '/examination/your-name',
	hint: "We'll use your email address to confirm we've received your submission. We will not publish your email address.",
	pageTitle: "What's your email address?",
	title: "What's your email address?",
	id: 'examination-email'
};

const emailView = 'pages/examination/email';
const currentView = {
	id: 'examination-email',
	view: 'pages/examination/email',
	route: '/your-name'
};

const deadLineItemRoute = '/examination/select-deadline-item';

const minMaxInputObject = {
	underMin: ['a', 'Your email address must be between 3 and 255 characters'],
	overMax: [
		'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
		'Your email address must be between 3 and 255 characters'
	],
	invalidEmail: [
		'abcexample.com',
		'Enter an email address in the correct format, like name@example.com'
	],
	betweenMinMax: ['abc@example.com', null]
};

describe('controllers/examination/name', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {
					'examination-email': 'test'
				}
			},
			currentView: {}
		};

		res = mockRes();

		jest.resetAllMocks();
	});

	describe('postEmail', () => {
		it(`should post data on email template and redirect to ${deadLineItemRoute} if currentView and requestSession are provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					'examination-email': 'test'
				},
				query: {
					mode: ''
				}
			};

			mockRequest.session.currentView = currentView;
			await postEmail(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(deadLineItemRoute);
		});

		it(`should re-render the email address template with errors if there is any validation error`, async () => {
			const mockRequest = {
				...req,
				body: {
					'examination-name': 'test',
					errorSummary: [
						{ text: 'Your email address must be between 3 and 255 characters', href: '#' }
					],
					errors: { error: 'error' }
				}
			};

			mockRequest.session.currentView = currentView;

			res = mockResponse();

			await postEmail(mockRequest, res);

			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(emailView, {
				...pageData,
				errorSummary: [
					{ text: 'Your email address must be between 3 and 255 characters', href: '#' }
				],
				errors: { error: 'error' }
			});
		});

		Object.entries(minMaxInputObject)
			.slice(0, 3)
			.forEach(([operationName, [operationValue, errorMessage]]) => {
				it(`should re-render the email address template with errors if input text is ${operationName} characters`, async () => {
					const mockRequest = {
						body: {
							errors: {
								'examination-email': {
									value: operationValue,
									msg: errorMessage,
									param: 'examination-email',
									location: 'body'
								}
							}
						},
						session: {
							examination: {}
						},
						query: {
							mode: ''
						}
					};

					mockRequest.session.currentView = currentView;

					await postEmail(mockRequest, res);
					expect(res.redirect).not.toHaveBeenCalled();

					expect(res.render).toHaveBeenCalledWith(emailView, {
						...pageData,
						errorSummary: [],
						errors: {
							'examination-email': {
								value: operationValue,
								msg: errorMessage,
								param: 'examination-email',
								location: 'body'
							}
						}
					});
				});
			});

		it(`should redirect user to /examination/select-deadline-item`, async () => {
			const mockRequest = {
				body: {
					'examination-name': 'test'
				},
				session: {
					examination: {}
				},
				query: {
					mode: ''
				}
			};

			mockRequest.session.currentView = currentView;

			await postEmail(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith(deadLineItemRoute);
		});

		it(`should redirect user to /examination/select-deadline-item`, async () => {
			const mockRequest = {
				body: {
					'examination-name': 'test'
				},
				session: {
					examination: {}
				},
				query: {
					mode: ''
				}
			};

			mockRequest.session.currentView = currentView;
			mockRequest.query.mode = 'edit';

			await postEmail(mockRequest, res);
			expect(res.render).not.toHaveBeenCalled();
			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-answers');
		});
	});

	describe('getEmail', () => {
		it('Calls the correct template without the examinationSession', () => {
			req.session = {};
			res = mockResponse();
			getEmail(req, res);
			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});

		it('Calls the correct template without the current view object values', () => {
			delete req.currentView;
			res = mockResponse();
			getEmail(req, res);
			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});

		it(`should call the correct template`, () => {
			req.session.currentView = currentView;

			getEmail(req, res);
			expect(res.render).toHaveBeenCalledWith(emailView, pageData);
		});

		it(`should call the correct template with pageData email value`, () => {
			req.session.currentView = currentView;

			req.session.examination.email = 'email@example.com';

			getEmail(req, res);
			expect(res.render).toHaveBeenCalledWith(emailView, {
				...pageData,
				email: 'email@example.com'
			});
		});
	});
});
