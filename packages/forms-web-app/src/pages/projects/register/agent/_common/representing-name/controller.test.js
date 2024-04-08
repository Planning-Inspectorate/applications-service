const {
	getRegisterAgentRepresentingNameController,
	postRegisterAgentRepresentingNameController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/agent/_common/representing-name/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			params: {
				case_ref: 'mock-case-ref'
			},
			session: {
				behalfRegdata: {
					representee: {
						'full-name': 'test'
					}
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterAgentRepresentingNameController', () => {
		it('should call the correct template', () => {
			getRegisterAgentRepresentingNameController(req, res);

			expect(res.render).toHaveBeenCalledWith(
				'projects/register/agent/representing-person-name/view.njk',
				{
					fullName: 'test'
				}
			);
		});
	});

	describe('#postRegisterAgentRepresentingNameController', () => {
		it('should post data and redirect to the representee over 18 page if name is provided', async () => {
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
			await postRegisterAgentRepresentingNameController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/projects/mock-case-ref/register/agent/are-they-18-over'
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

			mockRequest.session.behalfRegdata.representing = 'person';

			await postRegisterAgentRepresentingNameController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(
				'projects/register/agent/representing-person-name/view.njk',
				{
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' },
					representing: 'person'
				}
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

			mockRequest.session.behalfRegdata.representing = 'family';

			await postRegisterAgentRepresentingNameController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(
				'projects/register/agent/representing-household-name/view.njk',
				{
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' },
					representing: 'family'
				}
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

			mockRequest.session.behalfRegdata.representing = 'organisation';

			await postRegisterAgentRepresentingNameController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(
				'projects/register/agent/representing-organisation-name/view.njk',
				{
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' },
					representing: 'organisation'
				}
			);
		});
	});
});
