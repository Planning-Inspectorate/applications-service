const commentsController = require('../../../../../src/controllers/register/myself/tell-us-about-project');
const { postRegistration, putComments } = require('../../../../../src/lib/application-api-wrapper');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');
const config = require('../../../../../src/config');

jest.mock('../../../../../src/lib/application-api-wrapper');
jest.mock('../../../../../src/lib/logger');
jest.mock('../../../../../src/config');

describe('controllers/register/myself/tell-us-about-project', () => {
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

	describe('getComments', () => {
		it('should call the correct template', () => {
			commentsController.getComments(req, res);
			expect(res.render).toHaveBeenCalledWith('register/myself/tell-us-about-project', {
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
			commentsController.getComments(req, res);
			expect(res.render).toHaveBeenCalledWith('register/myself/tell-us-about-project', {
				comment: {
					comment: 'test'
				}
			});
		});
	});

	describe('postComments', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}' if comments is provided`, async () => {
			const mockRequest = {
				...req,
				body: {
					comments: 'test'
				},
				query: {
					mode: ''
				}
			};
			await commentsController.postComments(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
		});
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}' if comments is provided and mode is edit`, async () => {
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
			await commentsController.postComments(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}' if comments is provided and mode is draft`, async () => {
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
			await commentsController.postComments(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE}`);
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
			await commentsController.postComments(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT, {
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

			await commentsController.postComments(mockRequest, res);

			expect(res.redirect).toBeCalledWith(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
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

			await commentsController.postComments(mockRequest, res);

			expect(res.redirect).toBeCalledWith(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
		});

		test('on error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};

			await commentsController.postComments(mockRequest, res);

			expect(res.render).toBeCalledWith(
				VIEW.REGISTER.MYSELF.TELL_US_ABOUT_PROJECT,
				expect.objectContaining(mockRequest.body)
			);
		});
	});
});
