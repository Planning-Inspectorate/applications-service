const cyCommonTranslations = require('./common.json');

describe('locales/cy/common', () => {
	it('should return the welsh common translations', () => {
		expect(cyCommonTranslations).toEqual({
			search: 'Chwilio',
			hideButton: 'Cuddio',
			showButton: 'Dangos',
			hideAllButton: 'Cuddio pob adran',
			showAllButton: 'Dangos pob adran'
		});
	});
});
