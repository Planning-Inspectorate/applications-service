const {
	getRegisteringForController,
	postRegisteringForController,
	forwardPage
} = require('./controller');

const { VIEW } = require('../../../../lib/views');

const { mockReq, mockRes } = require('../../../../../__tests__/unit/mocks');

describe('pages/projects/register/registering-for/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				typeOfParty: 'myself'
			},
			query: {
				mode: ''
			},
			get: jest.fn().mockReturnValue('referrer-url')
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('#getRegisteringForController', () => {
		it('should call the correct template', () => {
			getRegisteringForController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/registering-for/view.njk', {
				backLinkUrl: '/projects/:case_ref/register/register-have-your-say',
				type: 'myself'
			});
		});
	});

	describe('#forwardPage', () => {
		it(`should return '/${VIEW.REGISTER.MYSELF.FULL_NAME}' if 1st option selected`, async () => {
			const pageRedirect = forwardPage('myself');

			expect(pageRedirect).toEqual(VIEW.REGISTER.MYSELF.FULL_NAME);
		});

		it(`should return '/${VIEW.REGISTER.ORGANISATION.FULL_NAME}' if 2nd option selected`, async () => {
			const pageRedirect = forwardPage('organisation');

			expect(pageRedirect).toEqual(VIEW.REGISTER.ORGANISATION.FULL_NAME);
		});

		it(`should return '/${VIEW.REGISTER.AGENT.FULL_NAME}' if 3rd option selected`, async () => {
			const pageRedirect = forwardPage('behalf');

			expect(pageRedirect).toEqual(VIEW.REGISTER.AGENT.FULL_NAME);
		});

		it(`should return '/${VIEW.REGISTER.TYPE_OF_PARTY}' if it is 'default'`, async () => {
			const pageRedirect = forwardPage('default');

			expect(pageRedirect).toEqual(VIEW.REGISTER.TYPE_OF_PARTY);
		});
	});

	describe('#postRegisteringForController', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.MYSELF.FULL_NAME}' if 1st option is selected`, async () => {
			const typeOfParty = 'myself';
			const mockRequest = {
				...req,
				body: {
					'type-of-party': typeOfParty
				}
			};
			await postRegisteringForController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.MYSELF.FULL_NAME}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.FULL_NAME}' if 2nd option is selected`, async () => {
			const typeOfParty = 'organisation';
			const mockRequest = {
				...req,
				body: {
					'type-of-party': typeOfParty
				}
			};
			await postRegisteringForController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.ORGANISATION.FULL_NAME}`
			);
		});

		it(`'should post data and redirect to '/${VIEW.REGISTER.AGENT.FULL_NAME}' if 3rd option is selected`, async () => {
			const typeOfParty = 'behalf';
			const mockRequest = {
				...req,
				body: {
					'type-of-party': typeOfParty
				}
			};
			await postRegisteringForController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/${VIEW.REGISTER.AGENT.FULL_NAME}`
			);
		});

		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					'type-of-party': null,
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};
			await postRegisteringForController(mockRequest, res);

			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/registering-for/view.njk', {
				backLinkUrl: '/projects/:case_ref/register/register-have-your-say',
				type: null,
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
