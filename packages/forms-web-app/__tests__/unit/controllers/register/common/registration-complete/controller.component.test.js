const {
	getConfirmation
} = require('../../../../../../src/controllers/register/common/registration-complete/controller');
jest.mock('../../../../../../src/services/registration.service', () => ({
	postCommentsData: jest.fn(),
	postRegistrationData: jest.fn()
}));
describe('controllers/register/common/registration-complete/controller', () => {
	describe('#getConfirmation', () => {
		describe('When getting the registration complete page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/registration-complete',
					session: {
						appData: { Region: 'mock region', ProjectName: 'mock project name' },
						mySelfRegdata: { email: 'mock email', ipRefNo: 'mock ip ref no' }
					}
				};
				beforeEach(() => {
					getConfirmation(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/registration-complete', {
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
					originalUrl: '/register/organisation/registration-complete',
					session: {
						appData: { Region: 'mock region', ProjectName: 'mock project name' },
						orgRegdata: { email: 'mock email', ipRefNo: 'mock ip ref no' }
					}
				};
				beforeEach(() => {
					getConfirmation(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/registration-complete', {
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
					originalUrl: '/register/agent/registration-complete',
					session: {
						appData: { Region: 'mock region', ProjectName: 'mock project name' },
						behalfRegdata: { representor: { email: 'mock email' }, ipRefNo: 'mock ip ref no' }
					}
				};
				beforeEach(() => {
					getConfirmation(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/registration-complete', {
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
			const res = { render: jest.fn(), status: jest.fn(() => res) };
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getConfirmation(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});
});
