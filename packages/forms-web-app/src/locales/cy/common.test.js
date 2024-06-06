const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			search: 'Chwilio',
			show: 'Dangos',
			hide: 'Cuddio',
			showAllSections: 'Dangos pob adran',
			hideAllSections: 'Cuddio pob adran',
			open: 'Agor',
			close: 'Caeedig',
			contents: 'Cynnwys',
			next: 'Nesaf',
			showAllSteps: 'Dangos pob cam',
			hideAllSteps: 'Cuddio pob cam',
			partOf: 'Rhan o',
			govUK: {
				pressOfficeOpeningHours:
					'9:00 tan 17:00 o ddydd Llun i ddydd Gwener (heblaw am wyliau cyhoeddus)'
			},
			pinsContactDetails: {
				csOpeningHours: 'Dydd Llun i ddydd Gwener, 9am tan 4pm (heblaw am wyliau cyhoeddus)'
			}
		});
	});
});
