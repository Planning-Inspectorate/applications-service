const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('./controller');
const { postRegistrationData } = require('../../../../../services/registration.service');

jest.mock('../../../../../../src/services/registration.service', () => ({
	postRegistrationData: jest.fn()
}));
describe('pages/projects/register/_common/declaration/controller', () => {
	describe('#getRegisterDeclarationController', () => {
		describe('When getting the declaration', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/declaration'
				};
				beforeEach(() => {
					getRegisterDeclarationController(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/declaration/view.njk',
						{
							pageTitle:
								'Declaration - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
						}
					);
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/declaration'
				};
				beforeEach(() => {
					getRegisterDeclarationController(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/declaration/view.njk',
						{
							pageTitle:
								'Declaration - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
						}
					);
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/declaration'
				};
				beforeEach(() => {
					getRegisterDeclarationController(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/declaration/view.njk',
						{
							pageTitle:
								'Declaration - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
						}
					);
				});
			});
		});
		describe('and there is an error', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getRegisterDeclarationController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postRegisterDeclarationController', () => {
		describe('When posting declaration', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};
			describe('and there is an unrecoverable error', () => {
				const req = { params: { case_ref: 'mock case ref' } };
				beforeEach(() => {
					postRegisterDeclarationController(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and the user has submitted a declaration for myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/declaration',
					params: { case_ref: 'mock case ref' },
					session: {
						comment: 'mock comment',
						mode: 'mock session mode',
						caseRef: 'mock case ref',
						mySelfRegdata: { text: 'mock session key data' }
					}
				};
				beforeEach(async () => {
					postRegistrationData.mockResolvedValue({ data: 'mock ip ref no from endpoint' });
					await postRegisterDeclarationController(req, res);
				});
				it('should get he ip ref no from the interested party endpoint ', () => {
					expect(postRegistrationData).toHaveBeenCalledWith(
						'{"text":"mock session key data","case_ref":"mock case ref","comment":"mock comment"}'
					);
				});
				it('should redirect to the next page for myself', () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/mock-base-url/mock-case-ref/register/myself/registration-complete'
					);
				});
			});
		});
	});
});
