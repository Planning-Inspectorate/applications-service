const { getRelatedContentLinks } = require('./get-related-content-links');

describe('pages/project-search/utils/get-related-content-links', () => {
	describe('#getRelatedContentLinks', () => {
		it('should return the related content links', () => {
			expect(getRelatedContentLinks).toEqual([
				{ name: 'Register of applications', url: '/register-of-applications' }
			]);
		});
	});
});
