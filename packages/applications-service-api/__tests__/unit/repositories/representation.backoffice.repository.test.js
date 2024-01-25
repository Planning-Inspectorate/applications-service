const {
	getRepresentationById,
	getRepresentations,
	getFilters
} = require('../../../src/repositories/representation.backoffice.repository');
const { REPRESENTATION_BACKOFFICE_DATA } = require('../../__data__/representation');

const mockFindFirst = jest.fn();
const mockFindMany = jest.fn();
const mockCount = jest.fn();
const mockQueryRaw = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		$queryRaw: (query) => mockQueryRaw(query),
		representation: {
			findFirst: (query) => mockFindFirst(query),
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query)
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

		describe('when only mandatory options (case reference and pagination) are provided', () => {
			it('should call the database with options', async () => {
				await getRepresentations({ caseReference: mockCaseReference, offset: 0, limit: 25 });
				expect(mockFindMany).toHaveBeenCalledWith(expectedCommonQuery);
			});
		});
		describe('when search term is provided', () => {
			it('should call the database with options', async () => {
				const expectedSearchTermQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [
							...expectedCommonQuery.where.AND,
							{
								OR: [
									{
										OR: [
											{ represented: { firstName: { contains: 'mock-search-term' } } },
											{ represented: { lastName: { contains: 'mock-search-term' } } },
											{ represented: { organisationName: { contains: 'mock-search-term' } } },
											{ representative: { firstName: { contains: 'mock-search-term' } } },
											{ representative: { lastName: { contains: 'mock-search-term' } } },
											{ representative: { organisationName: { contains: 'mock-search-term' } } },
											{ representationComment: { contains: 'mock-search-term' } }
										]
									}
								]
							}
						]
					}
				};

				await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					searchTerm: 'mock-search-term'
				});
				expect(mockFindMany).toHaveBeenCalledWith(expectedSearchTermQuery);
			});
		});
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
		describe('when all options are provided', () => {
			it('should call the database with options', async () => {
				const expectedQuery = {
					...expectedCommonQuery,
					where: {
						...expectedCommonQuery.where,
						AND: [
							...expectedCommonQuery.where.AND,
							{
								OR: [
									{
										OR: [
											{ represented: { firstName: { contains: 'mock-search-term' } } },
											{ represented: { lastName: { contains: 'mock-search-term' } } },
											{ represented: { organisationName: { contains: 'mock-search-term' } } },
											{ representative: { firstName: { contains: 'mock-search-term' } } },
											{ representative: { lastName: { contains: 'mock-search-term' } } },
											{ representative: { organisationName: { contains: 'mock-search-term' } } },
											{ representationComment: { contains: 'mock-search-term' } }
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

				await getRepresentations({
					caseReference: mockCaseReference,
					offset: 0,
					limit: 25,
					searchTerm: 'mock-search-term',
					type: ['mock-type']
				});
				expect(mockFindMany).toHaveBeenCalledWith(expectedQuery);
			});
		});
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
			mockQueryRaw.mockResolvedValue([{ representation_type: 'mock-representation-type' }]);
		});
		it('should execute query', async () => {
			await getFilters('mock-case-reference');
			expect(mockQueryRaw).toHaveBeenCalledWith(
				expect.objectContaining({ values: ['mock-case-reference'] })
			);
		});
	});
});
