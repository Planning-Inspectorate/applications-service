const { haveYourSayGuideSubdirectory } = require('./config');

describe('pages/have-your-say-guide/config', () => {
	describe('#haveYourSayGuideSubdirectory', () => {
		it('should return the have your say guide subdirectory', () => {
			expect(haveYourSayGuideSubdirectory).toEqual('having-your-say-guide');
		});
	});
});
