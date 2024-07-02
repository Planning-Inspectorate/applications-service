const { mapNISearchTermToQuery, mapBOSearchTermToQuery } = require('../../../src/utils/queries');
const { Op } = require('sequelize');
describe('queries', () => {
	const searchTerm = 'this is a searchTerm';
	const keys = ['key1', 'key2', 'key3'];
	describe('mapNISearchTermToQuery', () => {
		it('should return an empty object if no searchTerm is provided', () => {
			const result = mapNISearchTermToQuery();
			expect(result).toEqual({});
		});
		it('should return correct object with search term split', () => {
			const result = mapNISearchTermToQuery(searchTerm, keys);
			const expected = {
				[Op.or]: [
					{
						[Op.or]: [
							{ key1: { [Op.like]: '%this%' } },
							{ key2: { [Op.like]: '%this%' } },
							{ key3: { [Op.like]: '%this%' } }
						]
					},
					{
						[Op.or]: [
							{ key1: { [Op.like]: '%is%' } },
							{ key2: { [Op.like]: '%is%' } },
							{ key3: { [Op.like]: '%is%' } }
						]
					},
					{
						[Op.or]: [
							{ key1: { [Op.like]: '%a%' } },
							{ key2: { [Op.like]: '%a%' } },
							{ key3: { [Op.like]: '%a%' } }
						]
					},
					{
						[Op.or]: [
							{ key1: { [Op.like]: '%searchTerm%' } },
							{ key2: { [Op.like]: '%searchTerm%' } },
							{ key3: { [Op.like]: '%searchTerm%' } }
						]
					}
				]
			};
			expect(result).toEqual(expected);
		});
	});
	describe('mapBOSearchTermToQuery', () => {
		describe('when no searchTerm is provided', () => {
			it('should return an empty object', () => {
				const result = mapBOSearchTermToQuery();
				expect(result).toEqual({});
			});
		});
		describe('when a searchTerm is provided', () => {
			it('should return correct object with search term split', () => {
				const result = mapBOSearchTermToQuery(searchTerm, keys);
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
