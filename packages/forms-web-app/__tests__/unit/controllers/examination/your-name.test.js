const { getName, postName } = require('../../../../src/controllers/examination/name');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/logger');

const pageData = {
	backLinkUrl: '/examination/who-are-you-submitting-for',
	id: 'examination-name',
	pageTitle: 'What is your full name?',
	title: 'What is your full name?'
};

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

	describe('getName', () => {
		it('should call the correct template', () => {
			getName(req, res);
			expect(res.render).toHaveBeenCalledWith('pages/examination/name', pageData);
		});
	});

	describe('postName', () => {
		it(`'should post data and redirect to '/examination/your-email-address' if name is provided`, async () => {
			const fullName = 'test';
			const mockRequest = {
				...req,
				body: {
					'examination-name': fullName
				},
				query: {
					mode: ''
				}
			};
			await postName(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/your-email-address');
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

			expect(res.render).toHaveBeenCalledWith('pages/examination/name', {
				...pageData,
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});

		['aa', 'abcdefghjklmnopqrstvwxyzabcdefghjklmnopqrstvwxyzabcdefghjklmnopqr'].forEach(
			(nameValue, index) => {
				it(`should re-render the template with errors if input text is ${
					index === 0 ? 'less than 3' : 'greater than 64'
				} characters`, async () => {
					const mockRequest = {
						body: {
							errors: {
								'examination-name': {
									value: nameValue,
									msg: 'Full name must be between 3 and 64 characters',
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
						}
					};

					await postName(mockRequest, res);
					expect(res.redirect).not.toHaveBeenCalled();

					expect(res.render).toHaveBeenCalledWith('pages/examination/name', {
						...pageData,
						errorSummary: [],
						errors: {
							'examination-name': {
								value: nameValue,
								msg: 'Full name must be between 3 and 64 characters',
								param: 'examination-name',
								location: 'body'
							}
						}
					});
				});
			}
		);
	});
});
