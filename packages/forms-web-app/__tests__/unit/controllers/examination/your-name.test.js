const { getName, postName } = require('../../../../src/controllers/examination/name');
const { mockReq, mockRes, mockResponse } = require('../../mocks');
const {
	routesConfig: {
		examination: {
			pages: { nameMyself, nameOrganisation, nameAgent }
		}
	}
} = require('../../../../src/routes/config.js');

jest.mock('../../../../src/lib/logger');

const pageData = {
	backLinkUrl: '/examination/who-are-you-submitting-for'
};

const minMaxInputObject = {
	nameMyself: {
		underMin: 'a', // under 3 characters
		overMax: 'abcdefghjklmnopqrstvwxyzabcdefghjklmnopqrstvwxyzabcdefghjklmnopqr', // over 64 characters
		betweenMinMax: 'abc'
	},
	nameOrganisation: {
		underMin: '', // under 1 character
		overMax:
			'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', // over 255 characters
		betweenMinMax: 'abc'
	},
	nameAgent: {
		underMin: '', // under 1 character
		overMax:
			'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', // over 255 characters
		betweenMinMax: 'abc'
	}
};

const viewsObjectsList = [
	['nameMyself', nameMyself, minMaxInputObject.nameMyself],
	['nameOrganisation', nameOrganisation, minMaxInputObject.nameOrganisation],
	['nameAgent', nameAgent, minMaxInputObject.nameAgent]
];

describe('controllers/examination/name', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {
					'examination-name': 'test'
				}
			}
		};

		res = mockRes();

		jest.resetAllMocks();
	});

	describe('postName', () => {
		viewsObjectsList.forEach(([viewName, viewObject]) => {
			it(`should post data on ${viewName} template and redirect to '/examination/your-email-address' if name is provided`, async () => {
				const mockRequest = {
					...req,
					body: {
						'examination-name': 'test'
					},
					query: {
						mode: ''
					},
					currentView: viewObject
				};
				await postName(mockRequest, res);

				expect(res.redirect).toHaveBeenCalledWith('/examination/your-email-address');
			});
		});

		viewsObjectsList.forEach(([viewObjName, viewObject]) => {
			it(`should re-render the ${viewObjName} template with errors if there is any validation error`, async () => {
				const mockRequest = {
					...req,
					body: {
						'examination-name': 'test',
						errorSummary: [{ text: 'There are errors here', href: '#' }],
						errors: { a: 'b' }
					},
					currentView: viewObject
				};

				res = mockResponse();

				await postName(mockRequest, res);

				expect(res.redirect).not.toHaveBeenCalled();

				expect(res.render).toHaveBeenCalledWith('pages/examination/name', {
					...pageData,
					errorSummary: [{ text: 'There are errors here', href: '#' }],
					errors: { a: 'b' }
				});
			});
		});

		viewsObjectsList.forEach(([viewObjName, viewObject, minMaxObj]) => {
			const checkLength = viewObject.onError.message.checkLength;

			Object.entries(minMaxObj).forEach(([operationName, operationValue]) => {
				it(`should re-render the ${viewObjName} template with errors if input text is ${operationName} characters`, async () => {
					const mockRequest = {
						body: {
							errors: {
								'examination-name': {
									value: operationValue,
									msg: checkLength,
									param: 'examination-name',
									location: 'body'
								}
							}
						},
						session: {
							examination: {}
						},
						query: {
							mode: ''
						},
						currentView: viewObject
					};

					await postName(mockRequest, res);
					expect(res.redirect).not.toHaveBeenCalled();

					expect(res.render).toHaveBeenCalledWith('pages/examination/name', {
						...pageData,
						errorSummary: [],
						errors: {
							'examination-name': {
								value: operationValue,
								msg: checkLength,
								param: 'examination-name',
								location: 'body'
							}
						}
					});
				});
			});
		});

		viewsObjectsList.forEach(([viewObjName, viewObject]) => {
			const mockRequest = {
				body: {
					'examination-name': 'test'
				},
				session: {
					examination: {}
				},
				query: {
					mode: ''
				},
				currentView: viewObject
			};
			it(`should redirect user to /examination/your-email-address on template ${viewObjName}`, async () => {
				await postName(mockRequest, res);
				expect(res.redirect).toHaveBeenCalledWith('/examination/your-email-address');

				mockRequest.query.mode = 'edit';

				expect(res.redirect).toHaveBeenCalledWith('/examination/your-email-address');
			});

			it(`should redirect user to /examination/check-your-answers on template ${viewObjName}`, async () => {
				mockRequest.query.mode = 'edit';

				await postName(mockRequest, res);
				expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-answers');
			});
		});
	});

	describe('getName', () => {
		it('Calls the correct template without the examinationSession', () => {
			req.session = {};
			res = mockResponse();
			getName(req, res);
			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});

		it('Calls the correct template without the current view object values', () => {
			delete req.currentView;
			res = mockResponse();
			getName(req, res);
			expect(res.render).toHaveBeenCalledWith('error/not-found');
		});
	});

	viewsObjectsList.forEach(([viewObjName, viewObject]) => {
		it(`should call the correct template using viewObject: ${viewObjName}`, () => {
			req.currentView = viewObject;
			const { id, pageTitle, title, view } = req.currentView;

			getName(req, res);
			expect(res.render).toHaveBeenCalledWith('pages/examination/name', {
				...pageData,
				id,
				pageTitle,
				title,
				view
			});
		});
	});
});
