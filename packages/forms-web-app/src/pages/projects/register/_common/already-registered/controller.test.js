const { getRegisterAlreadyRegisteredController } = require('./controller');
describe('pages/projects/register/_common/already-registered/controller', () => {
	describe('#getRegisterAlreadyRegisteredController', () => {
		const res = {
			locals: { baseUrl: '/mock-base-url/mock-case-ref' },
			render: jest.fn(),
			redirect: jest.fn(),
			status: jest.fn(() => res)
		};
		describe('when the user has selected myself', () => {
			const req = {
				originalUrl: '/mock-base-url/mock-case-ref/register/myself/already-registered',
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			beforeEach(() => {
				res.render.mockClear();
				getRegisterAlreadyRegisteredController(req, res);
			});
			it('should render the already submitted template with key and journey', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/_components/generic-journey-complete-template.njk',
					{
						key: 'myself',
						journey: 'registration',
						backLinkUrl: null,
						projectsIndexURL: '/projects/mock-case-ref'
					}
				);
			});
		});
		describe('when the user has selected organisation', () => {
			const req = {
				originalUrl: '/mock-base-url/mock-case-ref/register/organisation/already-registered',
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			beforeEach(() => {
				res.render.mockClear();
				getRegisterAlreadyRegisteredController(req, res);
			});
			it('should render the already submitted template with key and journey', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/_components/generic-journey-complete-template.njk',
					{
						key: 'organisation',
						journey: 'registration',
						backLinkUrl: null,
						projectsIndexURL: '/projects/mock-case-ref'
					}
				);
			});
		});
		describe('when the user has selected agent', () => {
			const req = {
				originalUrl: '/mock-base-url/mock-case-ref/register/agent/already-registered',
				params: {
					case_ref: 'mock-case-ref'
				}
			};
			beforeEach(() => {
				res.render.mockClear();
				getRegisterAlreadyRegisteredController(req, res);
			});
			it('should render the already submitted template with key and journey', () => {
				expect(res.render).toHaveBeenCalledWith(
					'projects/_components/generic-journey-complete-template.njk',
					{
						key: 'agent',
						journey: 'registration',
						backLinkUrl: null,
						projectsIndexURL: '/projects/mock-case-ref'
					}
				);
			});
		});
		describe('and there is an error', () => {
			const req = {
				originalUrl: '/bad-url', // invalid URL will break getKeyFromUrl
				session: {}
			};
			it('should throw an error', () => {
				expect(() => getRegisterAlreadyRegisteredController(req, res)).toThrow();
			});
		});
	});
});
