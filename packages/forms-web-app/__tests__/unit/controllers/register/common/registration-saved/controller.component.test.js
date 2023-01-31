const {
	getRegistrationSaved
} = require('../../../../../../src/controllers/register/common/registration-saved/controller');
describe('controllers/register/common/registration-saved/controller', () => {
	describe('#getRegistrationSaved', () => {
		describe('When getting the registration saved page', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/registration-saved',
					session: {
						ipRefNo: 'mock ip ref no',
						mySelfRegdata: { email: 'mock email' }
					}
				};
				beforeEach(() => {
					getRegistrationSaved(req, res);
				});
				it('should render registration saved page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/registration-saved', {
						email: 'mock email',
						ipRefNo: 'mock ip ref no',
						pageTitle:
							'Your registration has been saved - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/registration-saved',
					session: {
						ipRefNo: 'mock ip ref no',
						orgRegdata: { email: 'mock email' }
					}
				};
				beforeEach(() => {
					getRegistrationSaved(req, res);
				});
				it('should render registration saved page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/registration-saved', {
						email: 'mock email',
						ipRefNo: 'mock ip ref no',
						pageTitle:
							'Your registration has been saved - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/register/agent/registration-saved',
					session: {
						ipRefNo: 'mock ip ref no',
						behalfRegdata: { representor: { email: 'mock email' } }
					}
				};
				beforeEach(() => {
					getRegistrationSaved(req, res);
				});
				it('should render registration saved page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/registration-saved', {
						email: 'mock email',
						ipRefNo: 'mock ip ref no',
						pageTitle:
							'Your registration has been saved - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
		});
		describe('and there is an error', () => {
			const res = { render: jest.fn(), status: jest.fn(() => res) };
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getRegistrationSaved(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});
});
