const representingForController = require('../../../../../src/controllers/register/agent/who-representing');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/agent/who-representing', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				behalfRegdata: {
					representing: 'family'
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getRepresentingFor', () => {
		it('should call the correct template', () => {
			representingForController.getRepresentingFor(req, res);
			expect(res.render).toHaveBeenCalledWith('register/agent/who-representing', {
				representing: 'family'
			});
		});
	});

	describe('postRepresentingFor', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY}' if representing-for is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'family'
				},
				query: {
					mode: ''
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}' if representing-for is changed to person`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'person'
				},
				query: {
					mode: 'edit'
				},
				session: {
					behalfRegdata: {
						representee: 'family'
					}
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY}' if representing-for is changed to family`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'family'
				},
				query: {
					mode: 'edit'
				},
				session: {
					behalfRegdata: {
						representing: 'person'
					}
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_FAMILY}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION}' if representing-for is changed to organisation`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'organisation'
				},
				query: {
					mode: 'edit'
				},
				session: {
					behalfRegdata: {
						representing: 'person'
					}
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}' if representing-for is not changed`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'organisation'
				},
				query: {
					mode: 'edit'
				},
				session: {
					behalfRegdata: {
						representing: 'organisation'
					}
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION}' if representing-for is organisation in normal journey`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'organisation'
				},
				query: {
					mode: ''
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME_ORGANISATION}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}' if representing-for is person in normal journey`, async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'person'
				},
				query: {
					mode: ''
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.REPRESENTEE_NAME}`
			);
		});
		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await representingForController.postRepresentingFor(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.AGENT.REPRESENTING_FOR, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
