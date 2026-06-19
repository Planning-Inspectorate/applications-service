const {
	getRegisterOrganisationAboutProjectController,
	postRegisterOrganisationAboutProjectController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

jest.mock('../../../../../lib/application-api-wrapper');
jest.mock('../../../../../lib/logger');
jest.mock('../../../../../config');

describe('pages/projects/register/organisation/about-project/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			query: {}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterOrganisationAboutProjectController', () => {
		it('should call the correct template', () => {
			getRegisterOrganisationAboutProjectController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/_common/about-project/view.njk', {
				comment: undefined,
				key: 'organisation'
			});
		});

		it('should call the correct template in edit mode', () => {
			req = {
				...mockReq(),
				query: {
					mode: 'edit',
					index: 0
				},
				session: {
					comment: 'test'
				}
			};
			getRegisterOrganisationAboutProjectController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/_common/about-project/view.njk', {
				comment: 'test',
				key: 'organisation'
			});
		});
	});

	describe('#postRegisterOrganisationAboutProjectController', () => {
		it('should post data and redirect to register organisation check answers page if comments is provided', async () => {
			const mockRequest = {
				...req,
				body: {
					comment: 'test'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterOrganisationAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/organisation/check-answers'
			);
		});

		it('should post data and redirect to register organisation check answers page if comments is provided and mode is edit', async () => {
			const mockRequest = {
				...req,
				body: {
					comment: 'updated comment'
				},
				query: {
					mode: 'edit'
				},
				session: {
					comment: 'test'
				}
			};
			await postRegisterOrganisationAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/organisation/check-answers'
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
			await postRegisterOrganisationAboutProjectController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/_common/about-project/view.njk', {
				errors: { a: 'b' },
				errorSummary: [{ href: '#', text: 'There were errors here' }],
				comment: undefined,
				key: 'organisation'
			});
		});
	});

	describe('postComments api response', () => {
		test('on success', async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				}
			};

			await postRegisterOrganisationAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/organisation/check-answers'
			);
		});

		test('on success edit mode', async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: 'edit'
				}
			};

			await postRegisterOrganisationAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/organisation/check-answers'
			);
		});

		test('on error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};

			await postRegisterOrganisationAboutProjectController(mockRequest, res);

			expect(res.render).toBeCalledWith(
				'projects/register/_common/about-project/view.njk',
				expect.objectContaining(mockRequest.body)
			);
		});
	});
});
