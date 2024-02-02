const { hasRepresentationsAvailable } = require('./has-representations-available');

describe('pages/projects/representations/index/_utils/has-representations-available', () => {
	describe('#hasRepresentationsAvailable', () => {
		const dateToday = '2020-01-02';
		const dateYesterday = '2020-01-01';
		const dateTomorrow = '2020-01-03';

		beforeAll(() => {
			jest.useFakeTimers().setSystemTime(new Date(dateToday));
		});

		describe('When determining if the representations are available', () => {
			describe('and the representaions are available today', () => {
				it('should return true', () => {
					expect(hasRepresentationsAvailable(dateToday)).toEqual(true);
				});
			});

			describe('and the representaions are available from yesterday', () => {
				it('should return true', () => {
					expect(hasRepresentationsAvailable(dateYesterday)).toEqual(true);
				});
			});

			describe('and the representaions are available tomorrow', () => {
				it('should return false', () => {
					expect(hasRepresentationsAvailable(dateTomorrow)).toEqual(false);
				});
			});

			describe('and the representations available date is null', () => {
				it('should return false', () => {
					expect(hasRepresentationsAvailable(null)).toEqual(false);
				});
			});
		});
	});
});
