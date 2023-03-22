const { findEventFromId } = require('./helpers');
describe('have your say events', () => {
	describe('#findEventFromId', () => {
		describe('When finding an event from an array of timetables', () => {
			const timetables = [
				{ uniqueId: 'mock-id', name: 'event 1' },
				{ uniqueId: 'second-id', name: 'event 2' }
			];
			describe('and the event is found', () => {
				const response = findEventFromId({ timetables }, 'mock-id');
				it('should return the event', () => {
					expect(response).toEqual({ uniqueId: 'mock-id', name: 'event 1' });
				});
			});
			describe('and the event is found', () => {
				const response = findEventFromId({ timetables }, 'not found id');
				it('should return the event', () => {
					expect(response).toBeUndefined();
				});
			});
		});
	});
});
