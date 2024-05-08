const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			search: 'Search',
			hide: 'Hide',
			show: 'Show',
			hideAllSections: 'Hide all sections',
			showAllSections: 'Show all sections'
		});
	});
});
