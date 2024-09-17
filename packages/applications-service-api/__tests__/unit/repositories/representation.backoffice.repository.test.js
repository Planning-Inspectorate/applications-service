const {
	getRepresentationById,
	getRepresentations,
	getFilters
} = require('../../../src/repositories/representation.backoffice.repository');
const { REPRESENTATION_BACKOFFICE_DATA } = require('../../__data__/representation');

const mockFindFirst = jest.fn();
const mockFindMany = jest.fn();
const mockCount = jest.fn();
const mockGroupBy = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		representation: {
			findFirst: (query) => mockFindFirst(query),
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query),
			groupBy: (query) => mockGroupBy(query)
		}
	}
}));

describe('service.backoffice.repository', () => {
	const commonWhereFilters = {
		status: {
			in: ['PUBLISHED', 'published']
		},
		OR: [
			{
				AND: [
					{ represented: { firstName: { not: null } } },
					{ represented: { firstName: { not: '' } } }
				]
			},
			{
				AND: [
					{ represented: { lastName: { not: null } } },
					{ represented: { lastName: { not: '' } } }
				]
			},
			{
				AND: [
					{ represented: { organisationName: { not: null } } },
					{ represented: { organisationName: { not: '' } } }
				]
			}
		]
	};
	describe('getRepresentationById', () => {
		beforeAll(() => {
			mockFindFirst.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
		});
		it('should call the database with the id', async () => {
			await getRepresentationById('mock-representation-id');
			expect(mockFindFirst).toHaveBeenCalledWith({
				where: {
					representationId: 'mock-representation-id',
					...commonWhereFilters
				},
				include: {
					represented: true,
					representative: true
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getRepresentationById('mock-representation-id');
			expect(result).toEqual(REPRESENTATION_BACKOFFICE_DATA);
		});
	});

	describe('getRepresentations', () => {
		beforeAll(() => {
			mockFindMany.mockResolvedValue([REPRESENTATION_BACKOFFICE_DATA]);
			mockCount.mockResolvedValue(1);
		});
		const mockCaseReference = 'mock-case-reference';
		const expectedCommonQuery = {
			where: {
				AND: [{ caseReference: mockCaseReference }, commonWhereFilters]
			},
			orderBy: {
				dateReceived: 'asc'
			},
			include: {
				represented: true,
				representative: true
			},
			skip: 0,
			take: 25
		};
		// const expectedSearchTermSection = {
		// 	OR: [
		// 		{ representationComment: { contains: 'mock search term' } },
		// 		{ representative: { organisationName: { contains: 'mock search term' } } },
		// 		{ represented: { organisationName: { contains: 'mock search term' } } },
		// 		{
		// 			OR: [
		// 				{ represented: { firstName: { contains: 'mock' } } },
		// 				{ represented: { lastName: { contains: 'mock' } } },
		// 				{ representative: { firstName: { contains: 'mock' } } },
		// 				{ representative: { lastName: { contains: 'mock' } } }
		// 			]
		// 		},
		// 		{
		// 			OR: [
		// 				{ represented: { firstName: { contains: 'search' } } },
		// 				{ represented: { lastName: { contains: 'search' } } },
		// 				{ representative: { firstName: { contains: 'search' } } },
		// 				{ representative: { lastName: { contains: 'search' } } }
		// 			]
		// 		},
		// 		{
		// 			OR: [
		// 				{ represented: { firstName: { contains: 'term' } } },
		// 				{ represented: { lastName: { contains: 'term' } } },
		// 				{ representative: { firstName: { contains: 'term' } } },
		// 				{ representative: { lastName: { contains: 'term' } } }
		// 			]
		// 		}
		// 	]
		// };

		describe('when only mandatory options (case reference and pagination) are provided', () => {
			it('should call the database with options', async () => {
				await getRepresentations({ caseReference: mockCaseReference, offset: 0, limit: 25 });
				expect(mockFindMany).toHaveBeenCalledWith(expectedCommonQuery);
			});
		});

		/*
		describe('when search term is provided', () => {
			it('should call the database with options', async () => {
				// Split the search term as the function does
				const firstPart = 'mock';
				const lastPart = 'term';

				// Expected query based on getRepresentations logic
				const expectedSearchTermQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [
							...expectedCommonQuery.where.AND,
							{
								OR: [
									{ representationComment: { contains: 'mock search term' } },
									{ representative: { organisationName: { contains: 'mock search term' } } },
									{ represented: { organisationName: { contains: 'mock search term' } } },
									{
										OR: [
											{ represented: { firstName: { contains: firstPart } } },
											{ represented: { lastName: { contains: lastPart } } },
											{ representative: { firstName: { contains: firstPart } } },
											{ representative: { lastName: { contains: lastPart } } }
										]
									}
								]
							}
						]
					}
				};

				// Mock function call
				await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					searchTerm: 'mock search term'
				});

				// Assert the database was called with the correct query
				expect(mockFindMany).toHaveBeenCalledWith(expectedSearchTermQuery);
			});
		});*/

		/*describe('when search term is provided', () => {
			it('should call the database with options', async () => {
				const expectedSearchTermQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [...expectedCommonQuery.where.AND, expectedSearchTermSection]
					}
				};

				await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					searchTerm: 'mock search term'
				});
				expect(mockFindMany).toHaveBeenCalledWith(expectedSearchTermQuery);
			});
		});
		*/

		describe('when type is provided', () => {
			it('should call the database with options', async () => {
				const expectedTypeQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [
							...expectedCommonQuery.where.AND,
							{
								representationType: {
									in: ['mock-type']
								}
							}
						]
					}
				};

				await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					type: ['mock-type']
				});
				expect(mockFindMany).toHaveBeenCalledWith(expectedTypeQuery);
			});
		});

		/*describe('when all options are provided', () => {
			it('should call the database with options', async () => {
				// Split the search term into first and last parts
				const firstPart = 'mock';
				const lastPart = 'term';

				// Build the expected query based on getRepresentations logic
				const expectedQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [
							...expectedCommonQuery.where.AND,
							{
								OR: [
									{ representationComment: { contains: 'mock search term' } },
									{ representative: { organisationName: { contains: 'mock search term' } } },
									{ represented: { organisationName: { contains: 'mock search term' } } },
									{
										OR: [
											{ represented: { firstName: { contains: firstPart } } },
											{ represented: { lastName: { contains: lastPart } } },
											{ representative: { firstName: { contains: firstPart } } },
											{ representative: { lastName: { contains: lastPart } } }
										]
									}
								]
							},
							{
								representationType: {
									in: ['mock-type']
								}
							}
						]
					}
				};

				// Call the function with all options
				const result = await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					searchTerm: 'mock search term',
					type: ['mock-type']
				});

				// Log the actual result for debugging
				console.log('Actual query:', JSON.stringify(result, null, 2));

				// Assert the correct query structure
				expect(mockFindMany).toHaveBeenCalledWith(expectedQuery);
			});
		});*/

		/*describe('when all options are provided', () => {
			it('should call the database with options', async () => {
				const expectedQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [
							...expectedCommonQuery.where.AND,
							expectedSearchTermSection,
							{
								representationType: {
									in: ['mock-type']
								}
							}
						]
					}
				};

				await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					searchTerm: 'mock search term',
					type: ['mock-type']
				});
				expect(mockFindMany).toHaveBeenCalledWith(expectedQuery);
			});
		});

		*/

		it('should return the correct data', async () => {
			const result = await getRepresentations({
				caseReference: 'mock-case-reference',
				offset: 0,
				limit: 25
			});
			expect(result).toEqual({
				representations: [REPRESENTATION_BACKOFFICE_DATA],
				count: 1
			});
		});
	});
	describe('getFilters', () => {
		beforeAll(() => {
			mockGroupBy.mockResolvedValue([
				{
					representationType: 'mock-type',
					_count: { id: 1 }
				}
			]);
		});
		it('should execute query', async () => {
			await getFilters('mock-case-reference');
			expect(mockGroupBy).toHaveBeenCalledWith({
				by: ['representationType', 'status'],
				where: {
					caseReference: 'mock-case-reference',
					representationType: {
						not: null
					},
					...commonWhereFilters
				},
				_count: {
					id: true
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getFilters('mock-case-reference');
			expect(result).toEqual([
				{
					name: 'mock-type',
					count: 1
				}
			]);
		});
	});
});
