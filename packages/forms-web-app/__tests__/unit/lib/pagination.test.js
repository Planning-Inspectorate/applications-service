const { generatePagination } = require('../../../src/lib/pagination');

describe('lib/pagination', () => {
  test(`generate expected data`, () => {
    expect(generatePagination(1, 6)).toEqual([1, 2, 3, '...', 6, 'next']);
    expect(generatePagination(2, 6)).toEqual(['prev', 1, 2, 3, '...', 6, 'next']);
    expect(generatePagination(3, 6)).toEqual(['prev', 1, 2, 3, 4, '...', 6, 'next']);
    expect(generatePagination(4, 6)).toEqual(['prev', 1, '...', 3, 4, 5, 6, 'next']);
    expect(generatePagination(5, 6)).toEqual(['prev', 1, '...', 4, 5, 6, 'next']);
    expect(generatePagination(6, 6)).toEqual(['prev', 1, '...', 4, 5, 6]);

    expect(generatePagination(1, 7)).toEqual([1, 2, 3, '...', 7, 'next']);
    expect(generatePagination(2, 7)).toEqual(['prev', 1, 2, 3, '...', 7, 'next']);
    expect(generatePagination(3, 7)).toEqual(['prev', 1, 2, 3, 4, '...', 7, 'next']);
    expect(generatePagination(4, 7)).toEqual(['prev', 1, '...', 3, 4, 5, '...', 7, 'next']);
    expect(generatePagination(5, 7)).toEqual(['prev', 1, '...', 4, 5, 6, 7, 'next']);
    expect(generatePagination(6, 7)).toEqual(['prev', 1, '...', 5, 6, 7, 'next']);
    expect(generatePagination(7, 7)).toEqual(['prev', 1, '...', 5, 6, 7]);

    expect(generatePagination(50, 100)).toEqual(['prev', 1, '...', 49, 50, 51, '...', 100, 'next']);
  });
});
