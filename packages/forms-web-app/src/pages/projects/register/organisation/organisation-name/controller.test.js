const {
	getRegisterOrganisationOrgNameController,
	postRegisterOrganisationOrgNameController
} = require('./controller');
const { mockReq, mockRes } = require('../../../../../../__tests__/unit/mocks');

describe('pages/projects/register/organisation/organisation-name/controller.js', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				orgRegdata: {
					'organisation-name': 'test'
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('#getRegisterOrganisationOrgNameController', () => {
		it('should call the correct template', () => {
			getRegisterOrganisationOrgNameController(req, res);
			expect(res.render).toHaveBeenCalledWith(
				'projects/register/organisation/organisation-name/view.njk',
				{
					organisationName: 'test'
				}
			);
		});
	});

	describe('#postRegisterOrganisationOrgNameController', () => {
		it('should post data and redirect to /what-job-title-or-role if name is provided', async () => {
			const organisationName = 'test';
			const mockRequest = {
				...req,
				body: {
					'organisation-name': organisationName
				},
				query: {
					mode: ''
				}
			};
			await postRegisterOrganisationOrgNameController(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(
				`/mock-base-url/mock-case-ref/register/organisation/what-job-title-or-role`
			);
		});
		it('should re-render the template with errors if there is any validation errors', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await postRegisterOrganisationOrgNameController(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(
				'projects/register/organisation/organisation-name/view.njk',
				{
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			);
		});
	});
});
