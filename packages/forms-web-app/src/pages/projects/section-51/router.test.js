const { getSection51IndexController } = require('./index/controller');
const { getSection51AdviceDetailController } = require('./advice-detail/controller');

const { projectsMiddleware } = require('../_middleware/middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../pages/_middleware/i18n/add-common-translations-middleware');
const {
	addSection51IndexTranslationsMiddleware
} = require('./index/_middleware/add-section-51-index-translations-middleware');

describe('pages/projects/section-51/router', () => {
	describe('#section51Router', () => {
		const get = jest.fn();
		const post = jest.fn();
		const use = jest.fn();

		jest.doMock('express', () => ({
			Router: () => ({
				get,
				post,
				use
			})
		}));

		beforeEach(() => {
			require('./router');
		});

		it('should call the section 51 index routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/s51advice',
				addCommonTranslationsMiddleware,
				addSection51IndexTranslationsMiddleware,
				projectsMiddleware,
				getSection51IndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/s51advice/:id',
				addCommonTranslationsMiddleware,
				projectsMiddleware,
				getSection51AdviceDetailController
			);

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(0);
			expect(use).toBeCalledTimes(1);
		});
	});
});
