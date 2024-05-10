const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			search: 'Search',
			show: 'Show',
			hide: 'Hide',
			showAllSections: 'Show all sections',
			hideAllSections: 'Hide all sections',
			open: 'Open',
			close: 'Close',
			contents: 'Contents',
			next: 'Next'
		});
	});
});
