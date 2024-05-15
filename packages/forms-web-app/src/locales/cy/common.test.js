const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			close: 'Caeedig',
			contents: 'Cynnwys',
			hide: 'Cuddio',
			hideAllSections: 'Cuddio pob adran',
			hideAllSteps: 'Cuddio pob cam',
			next: 'Nesaf',
			open: 'Agor',
			search: 'Chwilio',
			show: 'Dangos',
			showAllSections: 'Dangos pob adran',
			showAllSteps: 'Dangos pob cam'
		});
	});
});
