const { getName, postName } = require('../../../../src/controllers/examination/name');
const {
	VIEW: {
		EXAMINATION: { YOUR_EMAIL_ADDRESS, YOUR_NAME, ROUTE_PREFIX }
	}
} = require('../../../../src/lib/views');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

describe('controllers/examination/name', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {
					'full-name': 'test'
				}
			}
		};

		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getName', () => {
		it('should call the correct template', () => {
			getName(req, res);
			expect(res.render).toHaveBeenCalledWith('pages/examination/name', {
				backLinkUrl: 'who-are-you-submitting-for',
				fullName: '',
				title: 'What is your full name?'
			});
		});
	});

	describe('postFullName', () => {
		it(`'should post data and redirect to '/${
			ROUTE_PREFIX + YOUR_EMAIL_ADDRESS
		}' if name is provided`, async () => {
			const fullName = 'test';
			const mockRequest = {
				...req,
				body: {
					'full-name': fullName
				},
				query: {
					mode: ''
				}
			};
			await postName(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`${ROUTE_PREFIX + YOUR_EMAIL_ADDRESS}`);
		});
		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await postName(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(`${ROUTE_PREFIX + YOUR_NAME}`, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});

		['aa', 'abcdefghjklmnopqrstvwxyzabcdefghjklmnopqrstvwxyzabcdefghjklmnopqr'].forEach(
			(fullNameValue, index) => {
				it(`should re-render the template with errors if input text is ${
					index === 0 ? 'less than 3' : 'greater than 64'
				} characters`, async () => {
					const mockRequest = {
						body: {
							errors: {
								'full-name': {
									value: fullNameValue,
									msg: 'Full name must be between 3 and 64 characters',
									param: 'full-name',
									location: 'body'
								}
							}
						},
						query: {
							mode: ''
						}
					};

					await postName(mockRequest, res);
					expect(res.redirect).not.toHaveBeenCalled();

					expect(res.render).toHaveBeenCalledWith(`${ROUTE_PREFIX + YOUR_NAME}`, {
						errorSummary: [],
						errors: {
							'full-name': {
								value: fullNameValue,
								msg: 'Full name must be between 3 and 64 characters',
								param: 'full-name',
								location: 'body'
							}
						}
					});
				});
			}
		);
	});
});
