const {
	getRepresentationById,
	getRepresentationsByCaseReference
} = require('../../../src/repositories/representation.backoffice.repository');
const { REPRESENTATION_BACKOFFICE_DATA } = require('../../__data__/representation');

const mockFindUnique = jest.fn();
const mockFindMany = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		representation: {
			findUnique: (query) => mockFindUnique(query),
			findMany: (query) => mockFindMany(query)
		}
	}
}));
describe('service.backoffice.repository', () => {
	describe('getRepresentationById', () => {
		beforeAll(() => {
			mockFindUnique.mockResolvedValue(REPRESENTATION_BACKOFFICE_DATA);
		});
		it('should call the database with the id', async () => {
			await getRepresentationById('mock-representation-id');
			expect(mockFindUnique).toHaveBeenCalledWith({
				where: {
					representationId: 'mock-representation-id',
					status: {
						in: ['PUBLISHED', 'published']
					}
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getRepresentationById('mock-representation-id');
			expect(result).toEqual(REPRESENTATION_BACKOFFICE_DATA);
		});
	});

	describe('getRepresentationsByCaseReference', () => {
		beforeAll(() => {
			mockFindMany.mockResolvedValue([REPRESENTATION_BACKOFFICE_DATA]);
		});
		it('should call the database with the case reference', async () => {
			await getRepresentationsByCaseReference({ caseReference: 'mock-case-reference' });
			expect(mockFindMany).toHaveBeenCalledWith({
				where: {
					caseReference: 'mock-case-reference',
					status: {
						in: ['PUBLISHED', 'published']
					}
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getRepresentationsByCaseReference({
				caseReference: 'mock-case-reference'
			});
			expect(result).toEqual([REPRESENTATION_BACKOFFICE_DATA]);
		});
	});
});
