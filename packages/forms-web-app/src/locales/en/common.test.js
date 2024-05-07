const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			search: 'Search',
			hideButton: 'Hide',
			showButton: 'Show',
			hideAllButton: 'Hide all sections',
			showAllButton: 'Show all sections'
		});
	});
});
