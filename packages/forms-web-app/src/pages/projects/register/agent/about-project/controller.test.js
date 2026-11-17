const {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
} = require('./controller');
const { getRedirectURL } = require('../../_common/about-project/_utils/get-redirect-url');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

jest.mock('../../../../../lib/application-api-wrapper');
jest.mock('../../../../../lib/logger');
jest.mock('../../../../../config');
jest.mock('../../_common/about-project/_utils/get-redirect-url', () => ({
	getRedirectURL: jest.fn()
}));

describe('pages/projects/register/agent/about-project/controller', () => {
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

	describe('#getRegisterAgentAboutProjectController', () => {
		it('should call the correct template', () => {
			getRegisterAgentAboutProjectController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/_common/about-project/view.njk', {
				comment: undefined,
				key: 'agent'
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
			getRegisterAgentAboutProjectController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/_common/about-project/view.njk', {
				comment: 'test',
				key: 'agent'
			});
		});
	});

	describe('#postRegisterAgentAboutProjectController', () => {
		it(`'should post data and redirect to the register agent AI declaration page if comments provided`, async () => {
			getRedirectURL.mockReturnValue('/mock-base-url/mock-case-ref/register/agent/ai-declaration');
			const mockRequest = {
				...req,
				body: {
					comment: 'test'
				},
				query: {
					mode: ''
				}
			};

			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/ai-declaration'
			);
		});

		it(`'should post data and redirect to the register agent check answers page if comments provided and mode is edit`, async () => {
			getRedirectURL.mockReturnValue('/mock-base-url/mock-case-ref/register/agent/check-answers');
			const mockRequest = {
				...req,
				body: {
					comments: 'updated comment'
				},
				query: {
					mode: 'edit'
				},
				session: {
					comment: 'test'
				}
			};
			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/check-answers'
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
			await postRegisterAgentAboutProjectController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/_common/about-project/view.njk', {
				errors: { a: 'b' },
				errorSummary: [{ href: '#', text: 'There were errors here' }],
				comment: undefined,
				key: 'agent'
			});
		});
	});

	describe('postComments api response', () => {
		test('on success', async () => {
			getRedirectURL.mockReturnValue('/mock-base-url/mock-case-ref/register/agent/ai-declaration');
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				}
			};

			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/ai-declaration'
			);
		});

		test('on success edit mode', async () => {
			getRedirectURL.mockReturnValue('/mock-base-url/mock-case-ref/register/agent/check-answers');
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: 'edit'
				}
			};

			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/check-answers'
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

			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.render).toBeCalledWith(
				'projects/register/_common/about-project/view.njk',
				expect.objectContaining(mockRequest.body)
			);
		});
	});
});
