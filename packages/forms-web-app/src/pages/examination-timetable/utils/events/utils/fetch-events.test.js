const { fetchEvents } = require('./fetch-events');

const { getTimetables } = require('../../../../../lib/application-api-wrapper');

jest.mock('../../../../../lib/application-api-wrapper', () => ({
	getTimetables: jest.fn()
}));

describe('controllers/projects/examination-timetable/utils/events/utils/fetch-events', () => {
	describe('#fetchEvents', () => {
		describe('When fetching the events', () => {
			describe('and no events are returned', () => {
				let result;
				beforeEach(async () => {
					getTimetables.mockResolvedValue(() => undefined);
					result = await fetchEvents();
				});
				it('should return an empty array', () => {
					expect(result).toEqual([]);
				});
			});
			describe('and events are returned', () => {
				let result;
				beforeEach(async () => {
					getTimetables.mockResolvedValue({
						data: {
							timetables: [
								{
									mockEvent: 'mock event 1'
								},
								{
									mockEvent: 'mock event 2'
								}
							]
						}
					});
					result = await fetchEvents();
				});
				it('should return an array of events', () => {
					expect(result).toEqual([{ mockEvent: 'mock event 1' }, { mockEvent: 'mock event 2' }]);
				});
			});
		});
	});
});
