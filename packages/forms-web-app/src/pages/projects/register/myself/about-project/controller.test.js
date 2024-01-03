const {
	getRegisterMyselfAboutProjectController,
	postRegisterMyselfAboutProjectController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');
const config = require('../../../../../config');

const { postRegistration, putComments } = require('../../../../../lib/application-api-wrapper');

jest.mock('../../../../../lib/application-api-wrapper');
jest.mock('../../../../../config');

describe('pages/projects/register/myself/about-project/controller', () => {
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

	describe('#getRegisterMyselfAboutProjectController', () => {
		it('should call the correct template', () => {
			getRegisterMyselfAboutProjectController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/myself/about-project/view.njk', {
				comment: undefined
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
					comment: {
						comment: 'test'
					}
				}
			};
			getRegisterMyselfAboutProjectController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/myself/about-project/view.njk', {
				comment: {
					comment: 'test'
				}
			});
		});
	});

	describe('#postRegisterMyselfAboutProjectController', () => {
		it('should post data and redirect to the check your answers page if comments is provided', async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: ''
				}
			};
			await postRegisterMyselfAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/myself/check-answers'
			);
		});

		it('should post data and redirect to the check your answers page if comments is provided and mode is edit', async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: 'edit'
				},
				session: {
					comment: 'comment'
				}
			};
			await postRegisterMyselfAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/myself/check-answers'
			);
		});

		it(`'should post data and redirect to the registration complete page if comments is provided and mode is draft`, async () => {
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
					mySelfRegdata: {}
				}
			};
			await postRegisterMyselfAboutProjectController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/mock-base-url/mock-case-ref/register/myself/registration-complete'
			);
		});

		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' },
					comment: ''
				}
			};

			await postRegisterMyselfAboutProjectController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/myself/about-project/view.njk', {
				errors: { a: 'b' },
				errorSummary: [{ href: '#', text: 'There were errors here' }],
				comment: ''
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

			await postRegisterMyselfAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/myself/check-answers'
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

			await postRegisterMyselfAboutProjectController(mockRequest, res);

			expect(res.redirect).toBeCalledWith(
				'/mock-base-url/mock-case-ref/register/myself/check-answers'
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

			await postRegisterMyselfAboutProjectController(mockRequest, res);

			expect(res.render).toBeCalledWith(
				'projects/register/myself/about-project/view.njk',
				expect.objectContaining(mockRequest.body)
			);
		});
	});
});
