const { setHeaderTitle } = require('../../../src/middleware/get-header-title');

describe('middleware/get-header-title', () => {
	describe('and a  path url has a specific value', () => {
		describe('examination journey', () => {
			it('should NOT set header title for examination journey start page', () => {
				const req = {
					path: '/projects/EN010085/examination/have-your-say-during-examination'
				};
				const res = {
					locals: {}
				};
				const next = jest.fn();

				setHeaderTitle(req, res, next);
				expect(res.locals.headerTitle).toBeUndefined();
			});

			it('should set header title for following pages of the examination journey', () => {
				const req = {
					path: '/projects/EN010085/examination/any-page-except-index'
				};
				const res = {
					locals: {}
				};
				const next = jest.fn();

				setHeaderTitle(req, res, next);
				expect(res.locals.headerTitle).toBe('Have your say on an application');
			});
		});

		describe('get updates journey', () => {
			it('should NOT set header title for get updates journey start page', () => {
				const req = {
					path: '/projects/EN010085/get-updates/start'
				};
				const res = {
					locals: {}
				};
				const next = jest.fn();

				setHeaderTitle(req, res, next);
				expect(res.locals.headerTitle).toBeUndefined();
			});

			it('should set header title for following pages of the get updates journey', () => {
				const req = {
					path: '/projects/EN010085/get-updates/any-page-except-index'
				};
				const res = {
					locals: {}
				};
				const next = jest.fn();

				setHeaderTitle(req, res, next);
				expect(res.locals.headerTitle).toBe('Get updates about this project');
			});
		});

		describe('register to have your say journey', () => {
			it('should NOT set header title for register to have your say journey start page', () => {
				const req = {
					path: '/projects/EN010085/get-updates/start'
				};
				const res = {
					locals: {}
				};
				const next = jest.fn();

				setHeaderTitle(req, res, next);
				expect(res.locals.headerTitle).toBeUndefined();
			});

			it('should set header title for following pages of the register to have your say journey', () => {
				const req = {
					path: '/projects/EN010085/register/who-registering-for'
				};
				const res = {
					locals: {}
				};
				const next = jest.fn();

				setHeaderTitle(req, res, next);
				expect(res.locals.headerTitle).toBe('Register to have your say');
			});
		});
	});
});
