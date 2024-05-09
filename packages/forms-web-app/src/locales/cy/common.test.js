const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			contents: 'Cynnwys',
			hide: 'Cuddio',
			hideAllSections: 'Cuddio pob adran',
			next: 'Nesaf',
			search: 'Chwilio',
			show: 'Dangos',
			showAllSections: 'Dangos pob adran'
		});
	});
});
