const { representationsIndexRoute, representationsIndexI18nNamespace } = require('./config');

describe('pages/projects/representations/index/config', () => {
	describe('#representationsIndexRoute', () => {
		it('should return the representations index route', () => {
			expect(representationsIndexRoute).toEqual('');
		});
	});

	describe('#representationsIndexI18nNamespace', () => {
		it('should return the representations index namespace', () => {
			expect(representationsIndexI18nNamespace).toEqual('representationsIndex');
		});
	});
});
