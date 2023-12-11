const {
	getServiceUserById
} = require('../../../src/repositories/serviceUser.backoffice.repository');
const { SERVICE_USER_BACKOFFICE_DATA } = require('../../__data__/serviceUser');

const mockFindUnique = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		serviceUser: {
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));
describe('service.backoffice.repository', () => {
	describe('getServiceUserById', () => {
		beforeAll(() => {
			mockFindUnique.mockResolvedValue(SERVICE_USER_BACKOFFICE_DATA);
		});
		it('should call the database with the id', async () => {
			await getServiceUserById('mock-service-user-id');
			expect(mockFindUnique).toHaveBeenCalledWith({
				where: {
					serviceUserId: 'mock-service-user-id'
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getServiceUserById('mock-service-user-id');
			expect(result).toEqual(SERVICE_USER_BACKOFFICE_DATA);
		});
	});
});
