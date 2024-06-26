const {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

const { postRegistration, putComments } = require('../../../../../lib/application-api-wrapper');
const config = require('../../../../../config');

jest.mock('../../../../../lib/application-api-wrapper');
jest.mock('../../../../../lib/logger');
jest.mock('../../../../../config');

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

		postRegistration.mockImplementation(() =>
			Promise.resolve({ resp_code: 200, data: '30020010' })
		);

		putComments.mockImplementation(() => Promise.resolve({ resp_code: 200, data: {} }));

		config.featureFlag.allowSaveAndExitOption = true;
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
		it(`'should post data and redirect to the register agent check answers page if comments is provided`, async () => {
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
				'/mock-base-url/mock-case-ref/register/agent/check-answers'
			);
		});

		it(`'should post data and redirect to the register agent check answers page if comments is provided and mode is edit`, async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: 'edit'
				},
				session: {
					comments: []
				}
			};
			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/check-answers'
			);
		});

		it(`'should post data and redirect to the register agent complete page if comments is provided and mode is draft`, async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: 'draft'
				},
				session: {
					comment: 'comment',
					behalfRegdata: {}
				}
			};
			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/registration-complete'
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
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				}
			};

			await postRegisterAgentAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/agent/check-answers'
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
