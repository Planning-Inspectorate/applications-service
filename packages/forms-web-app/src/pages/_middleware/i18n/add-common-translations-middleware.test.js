const { addCommonTranslationsMiddleware } = require('./add-common-translations-middleware');

describe('pages/_middleware/i18n/add-common-translations-middleware', () => {
	describe('#addCommonTranslationsMiddleware', () => {
		describe('When there is an error', () => {
			const req = {
				i18n: {
					loadNamespaces: (namespace, callback) => {
						const err = true;
						callback(err);
					}
				}
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const next = jest.fn();

			beforeEach(() => {
				addCommonTranslationsMiddleware(req, res, next);
			});
			it('should render the error page', () => {
				expect(res.status).toBeCalledWith(500);
				expect(res.render).toBeCalledWith('error/unhandled-exception');
			});
		});

		describe('When there is no error', () => {
			const req = {
				i18n: {
					loadNamespaces: (namespace, callback) => {
						const err = false;
						callback(err);
					}
				}
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			const next = jest.fn();

			beforeEach(() => {
				addCommonTranslationsMiddleware(req, res, next);
			});
			it('should call next', () => {
				expect(next).toBeCalledTimes(1);
			});
		});
	});
});
