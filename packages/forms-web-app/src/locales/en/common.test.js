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
			next: 'Next',
			govUK: {
				pressOfficeOpeningHours: '9:00 to 17:00 on Monday to Friday (except public holidays)'
			}
		});
	});
});
