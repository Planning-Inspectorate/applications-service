const { registerMiddleware } = require('../middleware');
describe('#registerMiddleware', () => {
	it('registerMiddleware - no errors', () => {
		const next = jest.fn();
		const req = {
			session: {
				registerJourneyStarted: true,
				caseRef: 'a-case-ref'
			},
			params: {
				case_ref: 'a-case-ref'
			}
		};
		const res = {
			locals: {}
		};
		registerMiddleware(req, res, next);
		expect(next).toHaveBeenCalled();
	});
	it('registerMiddleware - no registerJourneyStarted in session', () => {
		const next = jest.fn();
		const req = {
			get: jest.fn().mockReturnValue('referrer-response'),
			session: {
				caseRef: 'a-case-ref'
			},
			params: {
				case_ref: 'a-case-ref'
			}
		};
		const res = {
			locals: {},
			render: jest.fn()
		};
		registerMiddleware(req, res, next);
		expect(res.render).toHaveBeenCalledWith('error/register-journey-error.njk', {
			detailsLink: '/projects/a-case-ref/register/register-have-your-say'
		});
	});

	it('registerMiddleware - no case_ref in params', () => {
		const next = jest.fn();
		const req = {
			get: jest.fn().mockReturnValue('referrer-response'),
			session: {
				registerJourneyStarted: true,
				caseRef: 'a-case-ref'
			},
			params: {}
		};
		const res = {
			locals: {},
			render: jest.fn()
		};
		registerMiddleware(req, res, next);
		expect(res.render).toHaveBeenCalledWith('error/register-journey-error.njk', {
			detailsLink: '/projects/undefined/register/register-have-your-say'
		});
	});

	it('registerMiddleware - no caseRef in session', () => {
		const next = jest.fn();
		const req = {
			get: jest.fn().mockReturnValue('referrer-response'),
			session: {
				registerJourneyStarted: true
			},
			params: {
				case_ref: 'a-case-ref'
			}
		};
		const res = {
			locals: {},
			render: jest.fn()
		};
		registerMiddleware(req, res, next);
		expect(res.render).toHaveBeenCalledWith('error/register-journey-error.njk', {
			detailsLink: '/projects/a-case-ref/register/register-have-your-say'
		});
	});

	it('registerMiddleware - no caseRef in session', () => {
		const next = jest.fn();
		const req = {
			get: jest.fn().mockReturnValue('referrer-response'),
			session: {
				registerJourneyStarted: true,
				caseRef: 'not-a-match-case-ref'
			},
			params: {
				case_ref: 'a-case-ref'
			}
		};
		const res = {
			locals: {},
			render: jest.fn()
		};
		registerMiddleware(req, res, next);
		expect(res.render).toHaveBeenCalledWith('error/register-journey-error.njk', {
			detailsLink: '/projects/a-case-ref/register/register-have-your-say'
		});
	});
});
