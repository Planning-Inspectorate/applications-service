const { getView } = require('./get-view');

describe('pages/projects/section-51/advice-detail/_utils/get-view', () => {
	describe('#getView', () => {
		describe('and the user is viewing the register of advice detail page', () => {
			let view;

			const path = '/register-of-advice/mock-id';
			const id = 'mock-id';

			beforeEach(() => {
				view = getView(path, id);
			});
			it('should return the register of advice detail view', () => {
				expect(view).toEqual('register-of-advice/detail/view.njk');
			});
		});

		describe('and the user is not viewing the register of advice detail page', () => {
			let view;

			const path = '/projects/mock-case-ref/s51advice/mock-id';
			const id = 'mock-id';

			beforeEach(() => {
				view = getView(path, id);
			});
			it('should return the section 51 advice detail view', () => {
				expect(view).toEqual('projects/section-51/advice-detail/view.njk');
			});
		});
	});
});
