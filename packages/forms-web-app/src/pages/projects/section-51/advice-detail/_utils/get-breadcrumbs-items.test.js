const { getBreadcrumbsItems } = require('./get-breadcrumbs-items');

describe('pages/projects/section-51/advice-detail/_utils/get-breadcrumbs-items', () => {
	describe('#getBreadcrumbsItems', () => {
		describe('When getting the breadcrumbs items', () => {
			describe('and the user is viewing the register of advice detail page', () => {
				let breadcrumbsItems;

				const path = '/register-of-advice/mock-id';
				const caseRef = 'mock-case-ref';
				const id = 'mock-id';

				beforeEach(() => {
					breadcrumbsItems = getBreadcrumbsItems(path, caseRef, id);
				});
				it('should return null', () => {
					expect(breadcrumbsItems).toEqual(null);
				});
			});

			describe('and the user is not viewing the register of advice detail page', () => {
				let breadcrumbsItems;

				const path = '/projects/mock-case-ref/s51advice/mock-id';
				const caseRef = 'mock-case-ref';
				const id = 'mock-id';

				beforeEach(() => {
					breadcrumbsItems = getBreadcrumbsItems(path, caseRef, id);
				});
				it('should return the breadcrumbs for the section 51 advice detail page', () => {
					expect(breadcrumbsItems).toEqual([
						{ href: '/projects/mock-case-ref/s51advice', text: 'Section 51 advice' },
						{ text: 'Advice in detail' }
					]);
				});
			});
		});
	});
});
