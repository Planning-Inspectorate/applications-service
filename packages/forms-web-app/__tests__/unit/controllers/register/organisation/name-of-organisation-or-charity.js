const organisationNameController = require('../../../../../src/controllers/register/organisation/name-of-organisation-or-charity');
const { VIEW } = require('../../../../../src/lib/views');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/logger');

describe('controllers/register/organisation/name-of-organisation-or-charity', () => {
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

	describe('getOrganisationName', () => {
		it('should call the correct template', () => {
			organisationNameController.getOrganisationName(req, res);
			expect(res.render).toHaveBeenCalledWith(
				'register/organisation/name-of-organisation-or-charity',
				{
					organisationName: 'test'
				}
			);
		});
	});

	describe('postOrganisationName', () => {
		it(`'should post data and redirect to '/${VIEW.REGISTER.ORGANISATION.ROLE}' if name is provided`, async () => {
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
			await organisationNameController.postOrganisationName(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.REGISTER.ORGANISATION.ROLE}`);
		});
		it('should re-render the template with errors if there is any validation error', async () => {
			const mockRequest = {
				...req,
				body: {
					errorSummary: [{ text: 'There were errors here', href: '#' }],
					errors: { a: 'b' }
				}
			};
			await organisationNameController.postOrganisationName(mockRequest, res);
			expect(res.redirect).not.toHaveBeenCalled();

			expect(res.render).toHaveBeenCalledWith(VIEW.REGISTER.ORGANISATION.ORGANISATION_NAME, {
				errorSummary: [{ text: 'There were errors here', href: '#' }],
				errors: { a: 'b' }
			});
		});
	});
});
