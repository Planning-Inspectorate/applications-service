const {
	inputNameId,
	getUpdatesHowOftenRoute,
	getUpdatesHowOftenI18nNamespace,
	howOftenViewMode
} = require('./config');

describe('pages/projects/get-updates/how-often/config', () => {
	describe('#inputNameId', () => {
		it('should return the input name id', () => {
			expect(inputNameId).toEqual('howOften');
		});
	});

	describe('#getUpdatesHowOftenRoute', () => {
		it('should return the get updates how often route', () => {
			expect(getUpdatesHowOftenRoute).toEqual('how-often');
		});
	});

	describe('#getUpdatesHowOftenI18nNamespace', () => {
		it('should return the get updates how often namespace', () => {
			expect(getUpdatesHowOftenI18nNamespace).toEqual('getUpdatesHowOften');
		});
	});

	describe('#howOftenViewMode', () => {
		it('should return the how often view mode', () => {
			expect(howOftenViewMode).toEqual({
				indexView: 'index',
				errorView: 'error'
			});
		});
	});
});
