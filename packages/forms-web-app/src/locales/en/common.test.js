const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			contents: 'Contents',
			hide: 'Hide',
			hideAllSections: 'Hide all sections',
			next: 'Next',
			search: 'Search',
			show: 'Show',
			showAllSections: 'Show all sections'
		});
	});
});
