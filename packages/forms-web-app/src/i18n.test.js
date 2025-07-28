const { i18nRedirect } = require('./i18n');

jest.mock('./config', () => ({
	featureFlag: {
		allowWelshTranslation: true
	}
}));

describe('i18n', () => {
	describe('#i18nRedirect', () => {
		describe('When the request method is not GET', () => {
			const req = { cookies: { lang: 'cy' }, method: 'POST', path: '/mock-path', query: {} };
			const res = { redirect: jest.fn() };
			const next = jest.fn();

			beforeEach(() => {
				i18nRedirect(req, res, next);
			});
			it('should not redirect and call next', () => {
				expect(res.redirect).toBeCalledTimes(0);
				expect(next).toBeCalledTimes(1);
			});
		});

		describe('When there is no selected locale', () => {
			const req = { cookies: {}, method: 'GET', path: '/mock-path', query: {} };
			const res = { redirect: jest.fn() };
			const next = jest.fn();

			beforeEach(() => {
				i18nRedirect(req, res, next);
			});
			it('should not redirect and call next', () => {
				expect(res.redirect).toBeCalledTimes(0);
				expect(next).toBeCalledTimes(1);
			});
		});

		describe('When there is a selected locale in the query', () => {
			const req = { cookies: {}, path: '/mock-path', method: 'GET', query: { lang: 'en' } };
			const res = { redirect: jest.fn() };
			const next = jest.fn();

			beforeEach(() => {
				i18nRedirect(req, res, next);
			});
			it('should not redirect and call next', () => {
				expect(res.redirect).toBeCalledTimes(0);
				expect(next).toBeCalledTimes(1);
			});
		});

		describe('When there is a selected locale in the cookies', () => {
			describe('and the selected locale is the default locale', () => {
				const req = { cookies: { lang: 'en' }, method: 'GET', path: '/mock-path', query: {} };
				const res = { redirect: jest.fn() };
				const next = jest.fn();

				beforeEach(() => {
					i18nRedirect(req, res, next);
				});

				it('should not redirect and call next', () => {
					expect(res.redirect).toBeCalledTimes(0);
					expect(next).toBeCalledTimes(1);
				});
			});

			describe('and the selected locale is not the default locale', () => {
				const req = { cookies: { lang: 'cy' }, method: 'GET', path: '/mock-path', query: {} };
				const res = { redirect: jest.fn() };
				const next = jest.fn();

				beforeEach(() => {
					i18nRedirect(req, res, next);
				});

				it('should redirect to the path with the added locale in the query', () => {
					expect(res.redirect).toBeCalledWith('/mock-path?lang=cy');
				});

				it('should not call next', () => {
					expect(next).toBeCalledTimes(0);
				});
			});
		});
	});
});
