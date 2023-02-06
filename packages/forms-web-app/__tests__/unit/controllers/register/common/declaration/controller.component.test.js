const {
	getDeclaration,
	postDeclaration
} = require('../../../../../../src/controllers/register/common/declaration/controller');
const {
	postCommentsData,
	postRegistrationData
} = require('../../../../../../src/services/registration.service');

jest.mock('../../../../../../src/services/registration.service', () => ({
	postCommentsData: jest.fn(),
	postRegistrationData: jest.fn()
}));
describe('controllers/register/common/declaration/controller', () => {
	describe('#getDeclaration', () => {
		describe('When getting the declaration', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and the user has selected myself', () => {
				const req = {
					originalUrl: '/register/myself/declaration'
				};
				beforeEach(() => {
					getDeclaration(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/declaration', {
						pageTitle:
							'Declaration - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/register/organisation/declaration'
				};
				beforeEach(() => {
					getDeclaration(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/declaration', {
						pageTitle:
							'Declaration - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/register/agent/declaration'
				};
				beforeEach(() => {
					getDeclaration(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith('register/common/declaration', {
						pageTitle:
							'Declaration - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
					});
				});
			});
		});
		describe('and there is an error', () => {
			const res = { render: jest.fn(), status: jest.fn(() => res) };
			const req = { session: 'mock session' };
			it('should throw an error', () => {
				expect(() => getDeclaration(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});

	describe('#postDeclaration', () => {
		describe('When posting declaration', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res),
				send: jest.fn()
			};
			describe('and there is an unrecoverable error', () => {
				const req = {};
				beforeEach(() => {
					postDeclaration(req, res);
				});

				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and the user has submitted a declaration for myself', () => {
				describe('and the session has an ipRefNo', () => {
					const req = {
						originalUrl: '/register/myself/declaration',
						session: {
							comment: 'mock comment',
							mode: 'mock session mode',
							caseRef: 'mock case ref',
							mySelfRegdata: { ipRefNo: 'mock ipRefNo', text: 'mock session key data' }
						}
					};
					beforeEach(async () => {
						postCommentsData.mockResolvedValue();
						postRegistrationData.mockResolvedValue({ data: 'mock ip ref no' });
						await postDeclaration(req, res);
					});
					it('should NOT get he ip ref no from the interested party endpoint ', () => {
						expect(postRegistrationData).not.toHaveBeenCalled();
					});
					it('should call the post comment endpoint', () => {
						expect(postCommentsData).toHaveBeenCalledWith(
							'mock ipRefNo',
							'{"comments":"mock comment","mode":"mock session mode"}'
						);
					});
					it('should redirect to the next page for myself', () => {
						expect(res.redirect).toHaveBeenCalledWith('/register/myself/registration-complete');
					});
				});
				describe('and the session does NOT have an ipRefNo', () => {
					const req = {
						originalUrl: '/register/myself/declaration',
						session: {
							comment: 'mock comment',
							mode: 'mock session mode',
							caseRef: 'mock case ref',
							mySelfRegdata: { text: 'mock session key data' }
						}
					};
					beforeEach(async () => {
						postCommentsData.mockResolvedValue();
						postRegistrationData.mockResolvedValue({ data: 'mock ip ref no from endpoint' });
						await postDeclaration(req, res);
					});
					it('should get he ip ref no from the interested party endpoint ', () => {
						expect(postRegistrationData).toHaveBeenCalledWith(
							'{"text":"mock session key data","case_ref":"mock case ref","mode":"mock session mode"}'
						);
					});
					it('should call the post comment endpoint', () => {
						expect(postCommentsData).toHaveBeenCalledWith(
							'mock ip ref no from endpoint',
							'{"comments":"mock comment","mode":"mock session mode"}'
						);
					});
					it('should redirect to the next page for myself', () => {
						expect(res.redirect).toHaveBeenCalledWith('/register/myself/registration-complete');
					});
				});
			});
		});
	});
});
