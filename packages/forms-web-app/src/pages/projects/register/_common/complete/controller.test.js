const { getRegisterCompleteController } = require('./controller');

describe('controllers/register/common/registration-complete/controller', () => {
	describe('#getRegisterCompleteController', () => {
		describe('When getting the registration complete page', () => {
			const res = {
				locals: { baseUrl: '/mock-base-url/mock-case-ref' },
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/registration-complete',
					session: {
						appData: { Region: 'mock region', ProjectName: 'mock project name' },
						mySelfRegdata: { email: 'mock email', ipRefNo: 'mock ip ref no' }
					}
				};
				beforeEach(() => {
					getRegisterCompleteController(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/complete/view.njk', {
						email: 'mock email',
						ipRefNo: 'mock ip ref no',
						nsipProjectLink:
							'https://infrastructure.planninginspectorate.gov.uk/projects/mock-region/mock-project-name',
						pageTitle:
							'Registration complete - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/registration-complete',
					session: {
						appData: { Region: 'mock region', ProjectName: 'mock project name' },
						orgRegdata: { email: 'mock email', ipRefNo: 'mock ip ref no' }
					}
				};
				beforeEach(() => {
					getRegisterCompleteController(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/complete/view.njk', {
						email: 'mock email',
						ipRefNo: 'mock ip ref no',
						nsipProjectLink:
							'https://infrastructure.planninginspectorate.gov.uk/projects/mock-region/mock-project-name',
						pageTitle:
							'Registration complete - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/registration-complete',
					session: {
						appData: { Region: 'mock region', ProjectName: 'mock project name' },
						behalfRegdata: { representor: { email: 'mock email' }, ipRefNo: 'mock ip ref no' }
					}
				};
				beforeEach(() => {
					getRegisterCompleteController(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/complete/view.njk', {
						email: 'mock email',
						ipRefNo: 'mock ip ref no',
						nsipProjectLink:
							'https://infrastructure.planninginspectorate.gov.uk/projects/mock-region/mock-project-name',
						pageTitle:
							'Registration complete - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
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
				expect(() => getRegisterCompleteController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});
});