const {
	getRepresentationById
} = require('../../../src/repositories/representation.backoffice.repository');
const { REPRESENTATION_BACKOFFICE_DATA } = require('../../__data__/representation');

const mockFindUnique = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		representation: {
			findUnique: (query) => mockFindUnique(query)
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
					representationId: 'mock-representation-id'
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getRepresentationById('mock-representation-id');
			expect(result).toEqual(REPRESENTATION_BACKOFFICE_DATA);
		});
	});
});
