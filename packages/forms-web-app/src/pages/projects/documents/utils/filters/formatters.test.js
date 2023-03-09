const { formatTitle, formatName, formatNameWithCount } = require('./formatters');
describe('Formatters', () => {
	describe('#formatTitle', () => {
		describe('When formatting the title', () => {
			const filter = { name: 'stage', value: 1 };
			const result = formatTitle(filter);
			it('should return a title in the correct format', () => {
				expect(result).toEqual('stage 1');
			});
		});
	});
	describe('#formatName', () => {
		describe('When formatting the name', () => {
			const filter = { name: 'stage', value: 1 };
			const result = formatName(filter);
			it('should return a name that is - seperated', () => {
				expect(result).toEqual('stage-1');
			});
		});
	});
	describe('#formatNameWithCount', () => {
		describe('When formatting the name with the count', () => {
			const result = formatNameWithCount('mock name', '1');
			it('should return a name with a count in ()', () => {
				expect(result).toEqual('mock name (1)');
			});
		});
	});
});
