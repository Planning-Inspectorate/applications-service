const {
	getRegisterOrganisationJobTitleController,
	postRegisterOrganisationJobTitleController
} = require('./controller');

const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/organisation/job-title/controller', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
					role: 'test'
				}
			},
			params: {
				case_ref: 'mock-case-ref'
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterOrganisationJobTitleController', () => {
		it('should call the correct template', () => {
			getRegisterOrganisationJobTitleController(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/register/organisation/job-title/view.njk', {
				role: 'test'
			});
		});
	});

	describe('#postRegisterOrganisationJobTitleController', () => {
		it(`'should post data and redirect to the register organisation email page if role is provided`, async () => {
			const role = 'test';
			const mockRequest = {
				...req,
				body: {
					role
				},
				query: {
					mode: ''
				}
			};
			await postRegisterOrganisationJobTitleController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				'/projects/mock-case-ref/register/organisation/email-address'
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
			await postRegisterOrganisationJobTitleController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith('projects/register/organisation/job-title/view.njk', {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
