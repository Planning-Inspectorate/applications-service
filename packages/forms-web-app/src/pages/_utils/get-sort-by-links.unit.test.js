const { getSortByLinks } = require('./get-sort-by-links');

describe('_utils/get-sort-by-links', () => {
	describe('#getSortByLinks', () => {
		describe('When getting the sort by links', () => {
			describe('and there are no query values', () => {
				const mockSortByLinks = [
					{
						name: 'mock name 1',
						value: 'mockValue1'
					},
					{
						name: 'mock name 2',
						value: 'mockValue2'
					},
					{
						name: 'mock name 3',
						value: 'mockValue3'
					}
				];

				let sortByLinks;

				beforeEach(() => {
					sortByLinks = getSortByLinks({}, mockSortByLinks);
				});
				it('should return the default sort by links', () => {
					expect(sortByLinks).toEqual([
						{ link: '?sortBy=%2BmockValue1&page=1', name: 'mock name 1', sort: 'none' },
						{ link: '?sortBy=%2BmockValue2&page=1', name: 'mock name 2', sort: 'none' },
						{ link: '?sortBy=%2BmockValue3&page=1', name: 'mock name 3', sort: 'none' }
					]);
				});
			});

			describe('and the query sorts a value in ascending order', () => {
				const mockSortByLinks = [
					{
						name: 'mock name 1',
						value: 'mockValue1'
					},
					{
						name: 'mock name 2',
						value: 'mockValue2'
					},
					{
						name: 'mock name 3',
						value: 'mockValue3'
					}
				];
				const mockQuery = { sortBy: '+mockValue1' };

				let sortByLinks;

				beforeEach(() => {
					sortByLinks = getSortByLinks(mockQuery, mockSortByLinks);
				});
				it('should return the sort by links with the specified value sorted in ascending order', () => {
					expect(sortByLinks).toEqual([
						{ link: '?sortBy=-mockValue1&page=1', name: 'mock name 1', sort: 'ascending' },
						{ link: '?sortBy=%2BmockValue2&page=1', name: 'mock name 2', sort: 'none' },
						{ link: '?sortBy=%2BmockValue3&page=1', name: 'mock name 3', sort: 'none' }
					]);
				});
			});

			describe('and the query sorts a value in descending order', () => {
				const mockSortByLinks = [
					{
						name: 'mock name 1',
						value: 'mockValue1'
					},
					{
						name: 'mock name 2',
						value: 'mockValue2'
					},
					{
						name: 'mock name 3',
						value: 'mockValue3'
					}
				];
				const mockQuery = { sortBy: '-mockValue1' };

				let sortByLinks;

				beforeEach(() => {
					sortByLinks = getSortByLinks(mockQuery, mockSortByLinks);
				});
				it('should return the sort by links with the specified value sorted in descending order', () => {
					expect(sortByLinks).toEqual([
						{ link: '?sortBy=%2BmockValue1&page=1', name: 'mock name 1', sort: 'descending' },
						{ link: '?sortBy=%2BmockValue2&page=1', name: 'mock name 2', sort: 'none' },
						{ link: '?sortBy=%2BmockValue3&page=1', name: 'mock name 3', sort: 'none' }
					]);
				});
			});

			describe('and there are sort by links without values', () => {
				const mockSortByLinks = [
					{
						name: 'mock name 1'
					},
					{
						name: 'mock name 2',
						value: 'mockValue2'
					},
					{
						name: 'mock name 3'
					}
				];

				let sortByLinks;

				beforeEach(() => {
					sortByLinks = getSortByLinks({}, mockSortByLinks);
				});
				it('should return the sort by links without values without a link or sort value', () => {
					expect(sortByLinks).toEqual([
						{ name: 'mock name 1' },
						{ link: '?sortBy=%2BmockValue2&page=1', name: 'mock name 2', sort: 'none' },
						{ name: 'mock name 3' }
					]);
				});
			});

			describe('and there are additional values in the query', () => {
				const mockSortByLinks = [
					{
						name: 'mock name 1'
					},
					{
						name: 'mock name 2',
						value: 'mockValue2'
					},
					{
						name: 'mock name 3',
						value: 'mockValue3'
					}
				];
				const mockQuery = {
					sortBy: '-mockValue1',
					mockKey1: 'mock key value 1',
					mockKey2: 'mock key value 2'
				};

				let sortByLinks;

				beforeEach(() => {
					sortByLinks = getSortByLinks(mockQuery, mockSortByLinks);
				});
				it('should return the sort by links with the additional values in the link query params', () => {
					expect(sortByLinks).toEqual([
						{ name: 'mock name 1' },
						{
							link: '?sortBy=%2BmockValue2&mockKey1=mock%20key%20value%201&mockKey2=mock%20key%20value%202&page=1',
							name: 'mock name 2',
							sort: 'none'
						},
						{
							link: '?sortBy=%2BmockValue3&mockKey1=mock%20key%20value%201&mockKey2=mock%20key%20value%202&page=1',
							name: 'mock name 3',
							sort: 'none'
						}
					]);
				});
			});
		});
	});
});
