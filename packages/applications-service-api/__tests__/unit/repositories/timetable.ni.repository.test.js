const {
	getTimetablesByCaseReference
} = require('../../../src/repositories/timetable.ni.repository');
const { TIMETABLES_NI_DATA } = require('../../__data__/timetables');
const db = require('../../../src/models');
const config = require('../../../src/lib/config');

jest.mock('../../../src/models');

describe('timetable.ni.repository', () => {
	beforeAll(() => {
		db.Timetable.findAll.mockResolvedValue(TIMETABLES_NI_DATA);
		config.timetableItemsPerPage = 100;
	});

	it('should call the database with the correct parameters', async () => {
		const result = await getTimetablesByCaseReference('ni');
		expect(result).toEqual(TIMETABLES_NI_DATA);
		expect(db.Timetable.findAll).toHaveBeenCalledWith({
			where: {
				case_reference: 'ni'
			},
			limit: 100,
			order: [['date_of_event', 'ASC']],
			raw: true
		});
	});
	it('should return the correct data', async () => {
		const result = await getTimetablesByCaseReference('ni');
		expect(result).toEqual(TIMETABLES_NI_DATA);
	});
});
