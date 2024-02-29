const { isRegistrationOpen } = require('./is-registration-open');
const { featureFlag } = require('../../../../../config');

jest.mock('../../../../../config', () => ({
	featureFlag: {}
}));

describe('projects/register/index/_utils/is-registration-open', () => {
	describe('#isRegistrationOpen', () => {
		describe('When determining if the registration is open', () => {
			const dateToday = '2023-01-02';

			beforeEach(() => {
				jest.useFakeTimers().setSystemTime(new Date(dateToday));
				featureFlag.openRegistrationCaseReferences = 're-opened case ref';
			});

			describe('and the open date is the same as the date today and no close date is set', () => {
				describe('and the case ref is in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = dateToday;
					const closeDate = null;
					const caseRef = 're-opened case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});

				describe('and the case ref is NOT in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = dateToday;
					const closeDate = null;
					const caseRef = 'mock case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});
			});

			describe('and the open date is before the date today and the close date is after the date today', () => {
				describe('and the case ref is in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2023-01-01';
					const closeDate = '2023-01-03';
					const caseRef = 're-opened case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});

				describe('and the case ref is NOT in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2023-01-01';
					const closeDate = '2023-01-03';
					const caseRef = 'mock case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});
			});

			describe('and the open date is after the date today', () => {
				describe('and the case ref is in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2023-01-03';
					const closeDate = '2023-01-04';
					const caseRef = 're-opened case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return false', () => {
						expect(registrationOpen).toEqual(true);
					});
				});

				describe('and the case ref is NOT in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2023-01-03';
					const closeDate = '2023-01-04';
					const caseRef = 'mock case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return false', () => {
						expect(registrationOpen).toEqual(false);
					});
				});
			});

			describe('and the close date is the date today', () => {
				describe('and the case ref is in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2023-01-01';
					const closeDate = dateToday;
					const caseRef = 're-opened case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});

				describe('and the case ref is in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2023-01-01';
					const closeDate = dateToday;
					const caseRef = 'mock case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});
			});

			describe('and the date today is after the close date', () => {
				describe('and the case ref is in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2022-01-01';
					const closeDate = '2022-01-02';
					const caseRef = 're-opened case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(true);
					});
				});

				describe('and the case ref is NOT in openRegistrationCaseReferences', () => {
					let registrationOpen;
					const openDate = '2022-01-01';
					const closeDate = '2022-01-02';
					const caseRef = 'mock case ref';

					beforeEach(() => {
						registrationOpen = isRegistrationOpen(openDate, closeDate, caseRef);
					});

					it('should return true', () => {
						expect(registrationOpen).toEqual(false);
					});
				});
			});
		});
	});
});
