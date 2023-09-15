const { isRegistrationOpen } = require('./is-registration-open');

describe('projects/register/index/_utils/is-registration-open', () => {
	describe('#isRegistrationOpen', () => {
		describe('When determining if the registration is open', () => {
			const dateToday = '2023-01-02';

			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date(dateToday));
			});
			describe('and the open date is the same as the date today and no close date is set', () => {
				let registrationOpen;
				const openDate = dateToday;

				beforeEach(() => {
					registrationOpen = isRegistrationOpen(openDate);
				});

				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('and the open date is before the date today and the close date is after the date today', () => {
				let registrationOpen;
				const openDate = '2023-01-01';
				const closeDate = '2023-01-03';

				beforeEach(() => {
					registrationOpen = isRegistrationOpen(openDate, closeDate);
				});

				it('should return true', () => {
					expect(registrationOpen).toEqual(true);
				});
			});

			describe('and the open date is after the date today', () => {
				let registrationOpen;
				const openDate = '2023-01-03';
				const closeDate = '2023-01-04';

				beforeEach(() => {
					registrationOpen = isRegistrationOpen(openDate, closeDate);
				});

				it('should return false', () => {
					expect(registrationOpen).toEqual(false);
				});
			});

			describe('and the close date is the date today', () => {
				let registrationOpen;
				const openDate = '2023-01-01';
				const closeDate = dateToday;

				beforeEach(() => {
					registrationOpen = isRegistrationOpen(openDate, closeDate);
				});

				it('should return false', () => {
					expect(registrationOpen).toEqual(false);
				});
			});
		});
	});
});
