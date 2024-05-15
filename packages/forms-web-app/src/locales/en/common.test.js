const enCommonTranslations = require('./common.json');

describe('locales/en/common', () => {
	it('should return the english common translations', () => {
		expect(enCommonTranslations).toEqual({
			close: 'Close',
			contents: 'Contents',
			hide: 'Hide',
			hideAllSections: 'Hide all sections',
			hideAllSteps: 'Hide all steps',
			next: 'Next',
			open: 'Open',
			search: 'Search',
			show: 'Show',
			showAllSections: 'Show all sections',
			showAllSteps: 'Show all steps'
		});
	});
});
