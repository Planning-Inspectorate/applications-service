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
			next: 'Nesaf'
		});
	});
});
