const {
	addSection51TranslationsMiddleware
} = require('../projects/section-51/_middleware/add-section-51-translations-middleware');
const { getRegisterOfAdviceController } = require('./index/controller');
const { getRegisterOfAdviceDetailController } = require('./detail/controller');
const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	registerOfAdviceTranslationsMiddleware
} = require('./index/_middleware/register-of-advice-middleware');

describe('pages/register-of-advice/router', () => {
	describe('#section51Router', () => {
		const get = jest.fn();
		const post = jest.fn();

		jest.doMock('express', () => ({
			Router: () => ({
				get,
				post
			})
		}));

		beforeEach(() => {
			require('./router');
		});

		it('should call the register of advice routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/register-of-advice',
				addCommonTranslationsMiddleware,
				addSection51TranslationsMiddleware,
				registerOfAdviceTranslationsMiddleware,
				getRegisterOfAdviceController
			);

			expect(get).toHaveBeenCalledWith(
				'/register-of-advice/:id',
				getRegisterOfAdviceDetailController
			);

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(0);
		});
	});
});
