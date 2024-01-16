const {
	getRegisterAgentRepresentingWhoController,
	postRegisterAgentRepresentingWhoController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/representing-who/controller', () => {
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

	describe('getRegisterAgentRepresentingWhoController', () => {
		it('should call the correct template', () => {
			getRegisterAgentRepresentingWhoController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/agent/representing-who/view.njk', {
				representing: 'family'
			});
		});
	});

	describe('postRegisterAgentRepresentingWhoController', () => {
		it('should post data and redirect to the representing family name page if representing-for is provided', async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'family'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/name-family-group-representing'
			);
		});

		it('should post data and redirect to the representing person name page if representing-for is changed to person', async () => {
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
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/name-person-representing'
			);
		});

		it('should post data and redirect to the representing family name page if representing-for is changed to family', async () => {
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
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/name-family-group-representing'
			);
		});

		it('should post data and redirect to the representing organisation name page if representing-for is changed to organisation', async () => {
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
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/name-organisation-representing'
			);
		});

		it('should post data and redirect to the representing organisation name page if representing-for is not changed', async () => {
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
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/check-answers'
			);
		});

		it('should post data and redirect to the representing organisation name page if representing-for is organisation in normal journey', async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'organisation'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/name-organisation-representing'
			);
		});

		it('should post data and redirect to the representing person name page if representing-for is person in normal journey', async () => {
			const mockRequest = {
				...req,
				body: {
					representing: 'person'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterAgentRepresentingWhoController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/name-person-representing'
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
			await postRegisterAgentRepresentingWhoController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/agent/representing-who/view.njk', {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
