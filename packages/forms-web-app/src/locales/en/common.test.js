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
			showAllSteps: 'Show all steps',
			hideAllSteps: 'Hide all steps',
			yes: 'Yes',
			no: 'No',
			saveChanges: 'Save changes',
			success: 'Success',
			govUK: {
				pressOfficeOpeningHours: '9:00 to 17:00 on Monday to Friday (except public holidays)'
			},
			pinsContactDetails: {
				csOpeningHours: 'Monday to Friday, 9am to 4pm (except bank holidays)'
			}
		});
	});
});
