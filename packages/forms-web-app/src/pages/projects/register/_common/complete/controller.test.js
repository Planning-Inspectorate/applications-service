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
					params: {
						case_ref: 'mock-case-ref'
					},
					session: {
						mySelfRegdata: { ipRefNo: 'mock-ip-ref-no' }
					}
				};
				beforeEach(() => {
					getRegisterCompleteController(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/complete/view.njk', {
						ipRefNo: 'mock-ip-ref-no',
						projectsIndexURL: '/projects/mock-case-ref',
						key: 'myself'
					});
				});
			});
			describe('and the user has selected organisation', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/organisation/registration-complete',
					params: {
						case_ref: 'mock-case-ref'
					},
					session: {
						orgRegdata: { ipRefNo: 'mock-ip-ref-no' }
					}
				};
				beforeEach(() => {
					getRegisterCompleteController(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/complete/view.njk', {
						ipRefNo: 'mock-ip-ref-no',
						projectsIndexURL: '/projects/mock-case-ref',
						key: 'organisation'
					});
				});
			});
			describe('and the user has selected agent', () => {
				const req = {
					originalUrl: '/mock-base-url/mock-case-ref/register/agent/registration-complete',
					params: {
						case_ref: 'mock-case-ref'
					},
					session: {
						behalfRegdata: { ipRefNo: 'mock-ip-ref-no' }
					}
				};
				beforeEach(() => {
					getRegisterCompleteController(req, res);
				});
				it('should render registration complete page', () => {
					expect(res.render).toHaveBeenCalledWith('projects/register/_common/complete/view.njk', {
						ipRefNo: 'mock-ip-ref-no',
						projectsIndexURL: '/projects/mock-case-ref',
						key: 'agent'
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
			const req = {
				session: 'mock-session',
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			it('should throw an error', () => {
				expect(() => getRegisterCompleteController(req, res)).toThrowError(
					"Cannot read properties of undefined (reading 'split')"
				);
			});
		});
	});
});
