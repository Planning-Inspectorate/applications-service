const { getBackLink } = require('./get-back-link');

describe('have your say #getBackLink', () => {
	describe('When getting the back link for the have your say page', () => {
		describe('and the user have come from the projects examination route', () => {
			const response = getBackLink('mock case ref', '/projects');
			it('should return the page data', () => {
				expect(response).toEqual('/projects/mock case ref/examination-timetable');
			});
		});
		describe('and the user have come from the projects examination route', () => {
			const response = getBackLink('mock case ref', '');
			it('should return the page data', () => {
				expect(response).toEqual('');
			});
		});
	});
});
