const { mapSearchTermToQuery } = require('../../../src/utils/queries');
describe('queries', () => {
	const searchTerm = 'this is a searchTerm';
	const keys = ['key1', 'key2', 'key3'];
	describe('mapTimetableToAPI', () => {
		describe('when no searchTerm is provided', () => {
			it('should return an empty object', () => {
				const result = mapSearchTermToQuery();
				expect(result).toEqual({});
			});
		});
		describe('when a searchTerm is provided', () => {
			it('should return correct object with search term split', () => {
				const result = mapSearchTermToQuery(searchTerm, keys);
				const expected = {
					OR: [
						{
							OR: [
								{ key1: { contains: 'this' } },
								{ key2: { contains: 'this' } },
								{ key3: { contains: 'this' } }
							]
						},
						{
							OR: [
								{ key1: { contains: 'is' } },
								{ key2: { contains: 'is' } },
								{ key3: { contains: 'is' } }
							]
						},
						{
							OR: [
								{ key1: { contains: 'a' } },
								{ key2: { contains: 'a' } },
								{ key3: { contains: 'a' } }
							]
						},
						{
							OR: [
								{ key1: { contains: 'searchTerm' } },
								{ key2: { contains: 'searchTerm' } },
								{ key3: { contains: 'searchTerm' } }
							]
						}
					]
				};
				expect(result).toEqual(expected);
			});
		});
	});
});
