const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			search: 'Chwilio',
			hide: 'Cuddio',
			show: 'Dangos',
			hideAllSections: 'Cuddio pob adran',
			showAllSections: 'Dangos pob adran'
		});
	});
});
