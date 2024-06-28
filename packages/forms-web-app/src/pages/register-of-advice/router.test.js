const {
	addSection51TranslationsMiddleware
} = require('../projects/section-51/_middleware/add-section-51-translations-middleware');
const {
	getSection51AdviceDetailController
} = require('../projects/section-51/advice-detail/controller');
const { getRegisterOfAdviceController } = require('./index/controller');
const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	addRegisterOfAdviceTranslationsMiddleware
} = require('./index/_middleware/register-of-advice-middleware');

describe('pages/register-of-advice/router', () => {
	describe('#section51Router', () => {
		const get = jest.fn();
		const post = jest.fn();

		jest.doMock('express', () => ({
			Router: () => ({
				get,
				post,
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
				addRegisterOfAdviceTranslationsMiddleware,
				getRegisterOfAdviceController
			);

			expect(get).toHaveBeenCalledWith(
				'/register-of-advice/:id',
				getSection51AdviceDetailController
			);

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(0);
		});
	});
});
