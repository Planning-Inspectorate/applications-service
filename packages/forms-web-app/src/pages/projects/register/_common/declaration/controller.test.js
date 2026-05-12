const { getRegisterDeclarationController } = require('./controller');

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
					originalUrl: '/mock-base-url/mock-case-ref/register/myself/declaration',
					session: {
						mySelfRegdata: {}
					}
				};
				beforeEach(() => {
					getRegisterDeclarationController(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/declaration/view.njk',
						{
							key: 'myself',
							nextPageUrl: '/mock-base-url/mock-case-ref/register/myself/process-submission'
						}
					);
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/declaration',
					session: {
						orgRegdata: {}
					}
				};
				beforeEach(() => {
					getRegisterDeclarationController(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/declaration/view.njk',
						{
							key: 'organisation',
							nextPageUrl: '/mock-base-url/mock-case-ref/register/organisation/process-submission'
						}
					);
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/declaration',
					session: {
						behalfRegdata: {}
					}
				};
				beforeEach(() => {
					getRegisterDeclarationController(req, res);
				});
				it('should render declaration page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'projects/register/_common/declaration/view.njk',
						{
							key: 'agent',
							nextPageUrl: '/mock-base-url/mock-case-ref/register/agent/process-submission'
						}
					);
				});
			});
			describe('and the user has already submitted', () => {
				const res = {
					locals: { baseUrl: '/mock-base-url/mock-case-ref' },
					render: jest.fn(),
					redirect: jest.fn(),
					status: jest.fn(() => res)
				};
				describe('for myself', () => {
					const req = {
						originalUrl: '/mock-base-url/mock-case-ref/register/myself/declaration',
						session: {
							mySelfRegdata: {
								hasSubmitted: true
							}
						}
					};
					beforeEach(() => {
						getRegisterDeclarationController(req, res);
					});
					it('should redirect to the already submitted page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/mock-base-url/mock-case-ref/register/myself/already-registered'
						);
					});
				});
				describe('for organisation', () => {
					const req = {
						originalUrl: '/mock-base-url/mock-case-ref/register/organisation/declaration',
						session: {
							orgRegdata: {
								hasSubmitted: true
							}
						}
					};
					beforeEach(() => {
						getRegisterDeclarationController(req, res);
					});
					it('should redirect to the already submitted page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/mock-base-url/mock-case-ref/register/organisation/already-registered'
						);
					});
				});
				describe('for agent', () => {
					const req = {
						originalUrl: '/mock-base-url/mock-case-ref/register/agent/declaration',
						session: {
							behalfRegdata: {
								representor: {
									hasSubmitted: true
								}
							}
						}
					};
					beforeEach(() => {
						getRegisterDeclarationController(req, res);
					});
					it('should redirect to the already submitted page', () => {
						expect(res.redirect).toHaveBeenCalledWith(
							'/mock-base-url/mock-case-ref/register/agent/already-registered'
						);
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
				expect(() => getRegisterDeclarationController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});
});
