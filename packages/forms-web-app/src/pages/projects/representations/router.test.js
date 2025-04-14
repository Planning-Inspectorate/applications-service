const { getRepresentationsIndexController } = require('./index/controller');
const { getRepresentationController } = require('./representation/controller');
const { projectsMiddleware } = require('../_middleware/middleware');
const {
	addCommonTranslationsMiddleware
} = require('./../../_middleware/i18n/add-common-translations-middleware');
const {
	addRepresentationsIndexTranslationsMiddleware
} = require('./index/_middleware/add-representations-index-translations-middleware');

jest.mock('../../../middleware/cache-control', () => {
	return {
		cacheMustRevalidateMaxAgeMiddleware: () => jest.fn()
	};
});

jest.mock('../_middleware/middleware', () => {
	return {
		projectsMiddleware: jest.fn()
	};
});

jest.mock('./../../_middleware/i18n/add-common-translations-middleware', () => {
	return {
		addCommonTranslationsMiddleware: jest.fn()
	};
});

jest.mock('./index/_middleware/add-representations-index-translations-middleware', () => {
	return {
		addRepresentationsIndexTranslationsMiddleware: jest.fn()
	};
});

describe('representations/router', () => {
	describe('#representationsRouter', () => {
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

		it('should call the representations routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/representations',
				projectsMiddleware,
				addCommonTranslationsMiddleware,
				addRepresentationsIndexTranslationsMiddleware,
				getRepresentationsIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/representations/:id',
				projectsMiddleware,
				addRepresentationsIndexTranslationsMiddleware,
				getRepresentationController
			);

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(1);
		});
	});
});
