const {
	getTimetablesByCaseReference
} = require('../../../src/repositories/timetable.backoffice.repository');
const { TIMETABLES_BACKOFFICE_DATA } = require('../../__data__/timetables');
const config = require('../../../src/lib/config');

const mockFindMany = jest.fn();
jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		examinationTimetable: {
			findMany: (query) => mockFindMany(query)
		}
	}
}));

describe('timetable.backoffice.repository', () => {
	beforeAll(() => {
		config.timetableItemsPerPage = 100;
		mockFindMany.mockResolvedValue(TIMETABLES_BACKOFFICE_DATA);
	});
	it('should call the database with the correct parameters', async () => {
		const result = await getTimetablesByCaseReference('backoffice');
		expect(result).toEqual(TIMETABLES_BACKOFFICE_DATA);
		expect(mockFindMany).toHaveBeenCalledWith({
			where: {
				caseReference: 'backoffice'
			},
			orderBy: {
				date: 'asc'
			},
			take: 100,
			include: {
				eventLineItems: true
			}
		});
	});
	it('should return the correct data', async () => {
		const result = await getTimetablesByCaseReference('backoffice');
		expect(result).toEqual(TIMETABLES_BACKOFFICE_DATA);
	});
});
